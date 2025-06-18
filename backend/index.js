const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
const auth = require("./routes/auth");

connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", auth);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
