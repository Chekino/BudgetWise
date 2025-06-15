const Transaction = require("../Models/transactionModel");

// Créer une transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, tags, date, description } = req.body;
    const userId = req.user.id;
    const transaction = await Transaction.create({
      user: userId,
      amount,
      type,
      category,
      tags,
      date,
      description,
    });

    await transaction.save();
    res
      .status(200)
      .json({ message: "Transaction crée avec succès", transaction });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Récupérer toutes les transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération.", error: err.message });
  }
};
// Récupérer une transaction par ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction non trouvée." });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Erreur.", error: err.message });
  }
};
// Mettre à jour une transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction non trouvée." });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Erreur.", error: err.message });
  }
};
// Supprimer une transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction non trouvée." });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Erreur.", error: err.message });
  }
};

// Calcul du solde

const getBalance = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let income = 0;
    let expense = 0;

    result.forEach((entry) => {
      if (entry._id === "income") income = entry.total;
      if (entry._id === "expense") expense = entry.total;
    });

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors du calcul du solde.", error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getBalance,
};
