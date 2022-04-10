const mongoose = require("mongoose");

// const dbUri =
//   process.env.NODE_ENV === "development"
//     ? "mongodb://localhost/react-express"
//     : process.env.DB_URI;

const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true });
mongoose.connection.on("connected", () =>
  console.log("Mongoose is connected to ", dbUri)
);
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose is disconnected")
);

process.on("SIGINT", () => {
  console.log("Mongoose disconnected on exit process");
  process.exit(0);
});

/*************************************************
                  User Schema
*************************************************/

const userSchema = new mongoose.Schema({
  google: {
    id: String,
    username: String,
    photo: String,
    email: String,
    accessToken: String,
    refreshToken: String,
  },
  plans: [],
});

mongoose.model("User", userSchema);
