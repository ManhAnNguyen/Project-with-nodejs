const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

let refreshTokens = [];

app.post("/login", (req, res) => {
  //authentication
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  refreshTokens = [...refreshTokens, refreshToken];
  console.log(refreshTokens);
  res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshTokens);

  if (!refreshToken)
    return res.status(403).json({ message: "Yout dont have permission" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Yout dont have permission" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Yout dont have permission" });
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(4000);
