import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Layout from "./routes/Layout";
import Register from "./Pages/Register";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const token = useAuthStore((state) => state.token); // ← prend depuis Zustand
  return (
    <>
      <Routes>
        {/* Routes publiques */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        {/* Routes privées */}
        <Route
          path="/*"
          element={token ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
