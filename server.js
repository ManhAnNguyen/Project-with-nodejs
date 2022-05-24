import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

const books = [
  {
    name: "ABC",
    id: 1,
    author: "ABC",
  },
  {
    name: "DEF",
    id: 2,
    author: "DEF",
  },
];

app.get("/books", authenToken, (req, res) => {
  res.json({ status: "Success", data: books });
});

app.post("/login", (req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  res.json({ accessToken });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  const token = authorizationHeader.split(" ")[1];

  if (!token) res.send(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ message: "You dont have authorization" });
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
