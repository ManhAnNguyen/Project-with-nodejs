import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5060;

app.use(express.json());

app.post("/login", (req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  res.json({ accessToken });
});

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
