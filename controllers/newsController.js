const axios = require("axios");

const getNews = async (req, res) => {
  try {
    // JWT verified by middleware, user info available in req.user
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Missing News API Key" });
    }

    // Search query from request, default = apple
    const { q = "apple" } = req.query;

    // GNews API URL
    const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=5&apikey=${apiKey}`;

    const response = await axios.get(url);

    return res.status(200).json({
      news: response.data.articles,
      user: userEmail, // optional, useful for debugging
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch news",
      error: err.message,
    });
  }
};

module.exports = { getNews };
