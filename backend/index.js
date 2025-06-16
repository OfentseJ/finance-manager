const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

connectDB();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
