const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const admin_route = require("./router/admin_route");
const login_route = require("./router/login_route");
require("dotenv").config();

app.use(express.json());

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("SWU Database Connected!"))
  .catch((err) => console.log(err));

//Endpoints
app.use("/api", admin_route);
app.use("/api", login_route);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
