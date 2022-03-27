const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const axios = require("axios");
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TOKEN}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/";

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/events", async (req, res) => {
  axios
    .get(
      `events?location=new_york&start_date=1647212963&categories=food-and-drink&radius=40000`
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.listen(process.env.PORT || port, () =>
  console.log(`listening at http://localhost:${port}`)
);
