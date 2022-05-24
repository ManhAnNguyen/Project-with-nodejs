require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/users", require("./routes/userRoutes"));
//listen on port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
