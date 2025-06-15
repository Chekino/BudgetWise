const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: {
    type: String,
    enum: ["Alimentation", "Sante", "Transport", "Loisirs", "Autres"],
  },
  tags: ["Urgent", "Récurrent"],
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
