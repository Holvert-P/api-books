const express = require("express");
// const mysql = require("mysql");
const connection = require("express-myconnection");
const routes = require("./routes");

const app = express();

app.set("port", process.env.PORT || 9000);

// const dbOptions = {
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "",
//   database: "library",
// };

//------------middlewares----------------------------
// app.use(connection(mysql, dbOptions, "single"));
app.use(express.json());

//------------ruotes---------------------------------
app.get("/", async (req, res) => {
  res.send("Welcome to my app");
});

app.use("/api", routes);

//-----------server runing---------------------------
app.listen(app.get("port"), () => {
  console.log("Server running");
});
