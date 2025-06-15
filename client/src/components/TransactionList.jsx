import { useEffect } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

const TransactionList = () => {
  const { transactions, fetchTransactions, deleteTransaction, fetchbalance } =
    useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Mes transactions</h2>

      <ul className="space-y-3">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="bg-gray-100 p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{tx.description}</p>
              <p
                className={`text-sm ${
                  tx.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.amount} € ({tx.type})
              </p>

              {tx.type && (
                <p className="text-xs text-gray-600">
                  Catégorie : {tx.category}
                  {tx.tags && tx.tags.length > 0 && (
                    <>
                      {" "}
                      | Tags :{" "}
                      <span className="font-semibold">
                        {tx.tags.join(", ")}
                      </span>
                    </>
                  )}
                </p>
              )}
            </div>
            <button
              className="btn btn-sm btn-error"
              onClick={() => deleteTransaction(tx._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
