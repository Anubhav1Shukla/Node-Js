const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Generate a unique short ID
  const shortID = shortid.generate();

  // Create a new URL document in the database using Mongoose
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // Return the generated short ID in the response
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,
        analytics: result.visitHistory})
}

module.exports = {
  handleGenrateNewShortURL,
  handleGetAnalytics,
};
