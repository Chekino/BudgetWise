import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Revenus & Dépenses</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  );
};

export default Transactions;
