const express = require("express");
const { setBudget, getBudget } = require("../Controllers/budgetController");

const router = express.Router();
const auth = require("../Middleware/requireAuth.js"); // middleware pour req.user

router.post("/", auth, setBudget);
router.get("/", auth, getBudget);

module.exports = router;
