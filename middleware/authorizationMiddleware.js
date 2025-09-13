const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const validateJWT = (req, res, next) => {
    try{

        const authHeader  = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) 
            {
               return res.status(401).json({ message: "Token is missing or malformed" });
            }

        const token = authHeader.split(" ")[1]; // extract token after 'Bearer'
        const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken; // attach decoded payload (e.g. email) to request
    next();
       }
    catch(err){    return res.status(500).json({ message: "Unauthorized", error: err.message });
}


   
    
    // console.log(decodedToken);
}


module.exports = validateJWT;