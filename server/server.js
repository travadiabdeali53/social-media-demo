const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/db/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/posts", require("./src/routes/postRoutes"));

app.use(
  "/api/comments",
  require("./src/routes/commentRoutes")
);

app.use(
  "/api/users",
  require("./src/routes/userRoutes")
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});