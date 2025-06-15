const express = require("express");
const {
  setBudget,
  getBudget,
  deleteBudget,
} = require("../Controllers/budgetController");

const router = express.Router();
const auth = require("../Middleware/requireAuth.js"); // middleware pour req.user

router.post("/", auth, setBudget);
router.get("/", auth, getBudget);
router.delete("/:id", auth, deleteBudget);

module.exports = router;
