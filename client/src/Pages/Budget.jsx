import { useEffect, useState } from "react";
import { useBudgetStore } from "../store/useBudgetStore";

const Budget = () => {
  const { budget, fetchBudget, updateBudget } = useBudgetStore();
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    fetchBudget();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAmount || isNaN(newAmount)) return;
    await updateBudget(Number(newAmount));
    setNewAmount("");
  };

  return (
    <div className="flex flex-col  justify-end items-center bg-gray-100 p-6">
      <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Mon Budget</h2>
        <p className="text-xl text-center text-green-600 mb-4">
          Budget actuel : {budget !== null ? `${budget} €` : "Chargement..."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Nouveau budget"
            className="input input-bordered w-full"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button className="btn btn-primary w-full" type="submit">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default Budget;
