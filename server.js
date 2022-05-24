const express = require("express");
const app = express();
const { authCourse, authPage } = require("./middleware/auth");

app.use(express.json());

app.get("/home", (req, res) => {
  res.json("HOME PAGE");
});

app.get("/course/grades", authPage(["teacher", "admin"]), (req, res) => {
  res.json({
    a: 10,
    b: 9,
    c: 9,
  });
});

app.get("/course/:number", authCourse, (req, res) => {
  const number = req.params.number;
  res.json(`You have permission to see the course ${number}`);
});

app.listen(3001, () => {
  console.log("server running in port 3001");
});
