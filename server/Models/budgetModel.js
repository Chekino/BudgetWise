const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: String, required: true }, // Format "2025-06"
  amount: { type: Number, required: true },
});

budgetSchema.index({ user: 1, month: 1 }, { unique: true });
module.exports = mongoose.model("Budget", budgetSchema);
