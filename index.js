import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

//all routes in here starting with users
app.use("/users", usersRoutes);

app.listen(PORT, () => console.log("Server running on PORT : 8000"));
