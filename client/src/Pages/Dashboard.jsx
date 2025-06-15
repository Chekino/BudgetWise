import { useEffect, useState } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

const Dashboard = () => {
  const fetchBalance = useTransactionStore((state) => state.fetchBalance);
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const getBalance = async () => {
      const data = await fetchBalance();
      if (data) {
        setBalanceData(data);
      }
    };

    getBalance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>

      <div className="bg-base-200 p-6 rounded-lg shadow mb-4">
        <p className="text-lg">Solde actuel :</p>
        <p
          className={`text-3xl font-bold ${
            balanceData.balance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {balanceData.balance.toFixed(2)} €
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm">Revenus</p>
          <p className="text-xl font-semibold text-green-700">
            +{balanceData.income.toFixed(2)} €
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-sm">Dépenses</p>
          <p className="text-xl font-semibold text-red-700">
            -{balanceData.expense.toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
