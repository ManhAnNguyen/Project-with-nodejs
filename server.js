const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

const posts = [
  {
    username: "abc",
    title: "das",
  },
  {
    username: "def",
    title: "das",
  },
  {
    username: "gfd",
    title: "das",
  },
  {
    username: "dsds",
    title: "das",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user);
  res.json(posts.filter((p) => p.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Yout dont have permission" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Yout dont have permission" });

    // console.log(user);
    // console.log("ok");

    req.user = user;
    next();
  });
}

app.listen(3000);
