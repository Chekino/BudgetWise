import { useState } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

const TransactionForm = () => {
  const { addTransaction } = useTransactionStore();
  const [category, setCategory] = useState("Autres");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // tableau de tags

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const data = {
      amount: Number(amount),
      description,
      type,
      category,
    };

    if (type === "expense") {
      data.tags = tags; // on ajoute les tags si c'est une dépense
    }

    await addTransaction(data);

    // Reset du formulaire
    setAmount("");
    setDescription("");
    setType("income");
    setCategory("Autres");
    setTags([]);
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setTags(selectedOptions);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-lg font-bold">Ajouter une transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input input-bordered w-full"
      />

      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="select select-bordered w-full"
      >
        <option value="income">Revenu</option>
        <option value="expense">Dépense</option>
      </select>

      {type === "expense" && (
        <>
          <div>
            <label className="block mb-1">Tags</label>
            <select
              value={tags}
              onChange={handleTagChange}
              className="select select-bordered w-full"
            >
              <option value="Urgent">Urgent</option>
              <option value="Récurrent">Récurrent</option>
            </select>
          </div>
        </>
      )}

      <div className="mb-4">
        <label className="block mb-1">Catégorie</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="Alimentation">Alimentation</option>
          <option value="Sante">Santé</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Autres">Autres</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Ajouter
      </button>
    </form>
  );
};

export default TransactionForm;
