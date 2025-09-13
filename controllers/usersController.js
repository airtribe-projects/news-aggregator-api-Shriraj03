const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt= parseInt(process.env.SALT_ROUNDS) ;
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    console.log(" Signup request body:", req.body );
    
    const { name, email, password,preferences } = req.body;
    console.log(" Preferences:", preferences ,"name:", name, "email:", email );

    // Validation
    if (!name || !email || !password) {
      console.log(" Missing required fields");
      
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if email exists
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user 
    const hashedPassword = await bcrypt.hash(password,salt );
    const dbUser = await usersModel.create({ name, email, password: hashedPassword, preferences });

    return res.status(200).json({
      message: "User created successfully",
      user: dbUser,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};




const login = async (req, res) => {
    
    const { email, password } = req.body;

    const dbUser = await usersModel.findOne({email});

    if (!dbUser) {
        return res.status(401).json({ error: "Invalid email" });
    }
 
     const isSamePassword = await bcrypt.compare(password, dbUser.password);    
    if (!isSamePassword) {
        return res.status(401).json({ error: "Invalid password" });
    }
    const payload={ email: dbUser.email};
    token= jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

     //return res.status(200).json(token);
     return res.status(200).json({ token });


}
const updatePreferences = async (req, res) => {
  try {
    const userEmail = req.user.email; // from JWT

    if (!userEmail) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { preferences } = req.body;

    if (!preferences) {
      return res.status(400).json({ message: "Preferences are required" });
    }

    const dbUser = await usersModel.findOneAndUpdate(
      { email: userEmail },             // filter by logged-in user's email
      { preferences: preferences },     // update preferences
      { new: true }                     // return updated document
    );

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Preferences updated successfully",
      preferences: dbUser.preferences,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getPreferences = async (req, res) => {
  try {
    const userEmail = req.user.email; // from JWT

    // if (!userEmail) {
    //   return res.status(401).json({ error: "Invalid token" });
    // }

    const dbUser = await usersModel.findOne(
      { email: userEmail },
      { preferences: 1, _id: 0 } // only return preferences
    );

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ preferences: dbUser.preferences });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { signup, login, updatePreferences, getPreferences };