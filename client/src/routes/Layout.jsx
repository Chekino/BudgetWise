import { Routes, Route, Navigate } from "react-router-dom";
import Budget from "../Pages/Budget";
import Transaction from "../Pages/Transaction";
import Navbar from "../components/Navbar";
import Dashboard from "../Pages/Dashboard";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<Transaction />} />
        {/* Redirection si la route n’existe pas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Layout;
