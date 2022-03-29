const router = require("express").Router();
const User = require("mongoose").model("User");
const { google } = require("googleapis");

router.get("/calendar/list", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { accessToken, refreshToken } = user.google;
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = response.data.items;
    if (events.length) {
      res.json(events);
    } else {
      res.status(404).json({ message: "No upcoming events found." });
    }
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;
