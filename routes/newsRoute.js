const express = require("express");
const router = express.Router();
const { getNews } = require("../controllers/newsController");
const validateJWT = require("../middleware/authorizationMiddleware");

// Protected route
router.get("/",validateJWT, getNews);

module.exports = router;
