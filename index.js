const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
require("./db");
console.log("run serever");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoute = require("./auth_route");
const calendarRoute = require("./calendar_route");
const axios = require("axios");

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TOKEN}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/";
// const PORT = process.env.PORT || 3001;
const BUILD_FOLDER = path.join(__dirname, "client", "build");
const isDevelopment = process.env.NODE_ENV === "development";

const User = mongoose.model("User");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isDevelopment
        ? `http://localhost:${PORT}/auth/google/callback`
        : `${process.env.BASE_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("gogole profile =", accessToken, refreshToken);
      console.log(profile, "this is the profile");
      const update = {
        google: {
          id: profile.id,
          username: profile.displayName,
          photo: profile.photos[0].value,
          email: profile.emails[0].value,
          accessToken,
          refreshToken,
        },
      };
      User.findOneAndUpdate(
        { "google.id": profile.id },
        update,
        { upsert: true, new: true, useFindAndModify: false },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) return done(err);
    done(null, user);
  });
});
const store = new MongoDBStore({
  uri: isDevelopment ? "mongodb://localhost/react-express" : process.env.DB_URI,
  collection: "session",
});

app.use(express.static(path.join(__dirname, "build")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "my secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //one week
    },
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);
app.use(calendarRoute);
function checkAuthMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).send("not authorized");
  }
  next();
}

app.get("/autocomplete/:text", async (req, res) => {
  const { text } = req.params;
  axios
    .get(`/autocomplete?text=${text}`)
    .then((response) => {
      // throw new Error("my bad");

      res.json(response.data);
    })
    .catch((err) => res.send({ message: err.message }));
});

app.get("/api/users", checkAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.google);
});

app.post("/saveplan", checkAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  const body = req.body;
  if (user) {
    console.log("reached save plan user exists");
    const { id, derivedData } = body;
    user.plans.push({ id, derivedData });
    await user.save();
    res.json({ user, message: "success" });
  } else {
    res.json({ err: "theere was some errr" });
  }
});

app.post("/api/", (req, res) => {
  const body = req.body;
  const { center, categories } = body;
  const { lat, lng } = center;
  const max = 6;
  const mappedCategories = categories.map((category) => {
    let terms = "",
      categoryStr = "";
    if (category.def === "term") {
      terms += category.value + ",";
    } else {
      categoryStr += category.value + ",";
    }

    terms = terms.slice(0, terms.length - 1);
    categoryStr = categoryStr.slice(0, categoryStr.length - 1);
    const url =
      "businesses/search?term=" +
      terms +
      "&categories=" +
      categoryStr +
      "&latitude=" +
      lat +
      "&longitude=" +
      lng +
      `&sort_by=distance&limit=${max / categories.length}`;
    // console.log({ url });
    return axios.get(url).catch((e) => console.log(e));
  });

  Promise.all(mappedCategories)
    .then((values) => {
      console.log({ values });
      const data = values.map((val) => val.data);
      res.json(data);
    })
    .catch((err) => res.status(err.response.status).send(err.message));
});

const isAuthenticatedCookie = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.isAuthenticated = true;
  } else {
    res.isAuthenticated = false;
  }
  next();
};

const options = {
  setHeaders: function (res, path, stat) {
    res.cookie("isAuthenticated", res.isAuthenticated);
  },
};

app.use(isAuthenticatedCookie, express.static(BUILD_FOLDER, options));

//above the added stuff

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/get_shared_plan", (req, res) => {
  const { query } = req;
  const { email, id } = query;
  User.findOne({ "google.email": email }, function (err, doc) {
    if (err) {
      return res.status(err.response.status).send(err.message);
    } else {
      const plan = doc.plans.find((plan) => plan.id === id);
      return res.json(plan);
    }
  });
});

app.post("/get_buisness_reviews", async (req, res) => {
  const { body } = req;
  const { id } = body;
  axios
    .get(`businesses/${id}/reviews`)
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});
app.get("/events", async (req, res) => {
  axios
    .get(
      `events?location=new_york&start_date=1647212963&categories=food-and-drink&radius=40000`
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.get("*", function (req, res) {
  console.log("reached in here");
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);
