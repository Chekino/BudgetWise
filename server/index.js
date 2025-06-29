const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./Routes/userRoute");
const transactionRoutes = require("./Routes/transactionRoute");
const budgetRoutes = require("./Routes/budgetRoute");

const app = express();

app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Permet  les ressources du même domaine
      connectSrc: ["'self'", "https://budgetwise-2fnw.onrender.com"], // Permet les connexions API
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.get("/", (req, res) => {
  res.send("hello from server express");
});

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed: ", error.message);
  });
