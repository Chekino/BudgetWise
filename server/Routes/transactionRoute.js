const express = require("express");
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getBalance,
} = require("../Controllers/transactionController");

const router = express.Router();
const auth = require("../Middleware/requireAuth.js"); // middleware pour req.user

router.post("/", auth, createTransaction);
router.get("/", auth, getTransactions);
router.get("/balance", auth, getBalance);
router.get("/:id", auth, getTransactionById);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

module.exports = router;
