const Budget = require("../Models/budgetModel");

// Obtenir le mois actuel
function getCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Mois de 0 à 11, on ajoute 1
  return `${year}-${month}`;
}

// Enregistrer un budget
const setBudget = async (req, res) => {
  try {
    let { month, amount } = req.body;
    if (!month) {
      month = getCurrentMonth(); // affecte le mois actuel si non fourni
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { user: req.user._id, month },
      { amount },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Budget enregistré avec succès.",
      budget: updatedBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l’enregistrement du budget.",
      error: err.message,
    });
  }
};

// Récupérer le budget
const getBudget = async (req, res) => {
  try {
    let month = req.query.month;
    if (!month) {
      month = getCurrentMonth();
    }

    const budget = await Budget.findOne({ user: req.user._id, month });
    if (!budget)
      return res
        .status(404)
        .json({ message: "Aucun budget trouvé pour ce mois." });

    res.json(budget);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du budget.",
      error: err.message,
    });
  }
};

module.exports = { setBudget, getBudget };
