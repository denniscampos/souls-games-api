const PORT = process.env.PORT || 8000;
const express = require("express");
const routes = require("./routes/");

const app = express();

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("games");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
