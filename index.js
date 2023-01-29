const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const storyRoutes = require("./Routes/StoryRoutes");
const baseRoutes = require("./Routes/BaseRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// mongoose.connect(
//   process.env.DATABASE_ACCESS,
//   {
//     useNewUrlParser: true,
//   },
//   () => console.log("Database connected")
// );
app.use(function (req, res, next) {
  res.set(
    "Access-Control-Allow-Origin",
    "https://johnsfarrell.github.io",
    "http://localhost:3000"
  );
  res.set("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use("/story/", storyRoutes);
app.use("/", baseRoutes);

app.listen(process.env.PORT, function () {
  console.log(`Listening on Port ${process.env.PORT}`);
});
