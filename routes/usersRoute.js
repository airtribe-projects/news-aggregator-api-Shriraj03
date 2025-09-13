

const {signup, login, getPreferences, updatePreferences} = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const validateJWT = require("../middleware/authorizationMiddleware");
//const brypt = require("bcrypt");

router.post("/signup", signup);
router.post("/login", login);
router.get("/preferences",validateJWT, getPreferences);
router.put("/preferences",validateJWT, updatePreferences);


module.exports = router;