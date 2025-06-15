import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  // État pour contrôler l'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour fermer le menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm relative z-30">
        <div className="navbar-start">
          <div className="lg:hidden">
            <button
              className="btn btn-ghost"
              onClick={toggleMenu}
              aria-label="Menu principal"
            >
              {/* Icône qui change selon l'état du menu */}
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <a className="btn btn-ghost text-xl">BudgetWise</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal font-bold">
            <li className="px-6">
              <a href="/">Dashboard</a>
            </li>
            <li className="px-6">
              <a href="/transactions">Revenue et dépenses</a>
            </li>
            <li className="px-6">
              <a href="/budget">Gestion du Budget</a>
            </li>
            <li className="px-6">
              <a onClick={handleLogout}>Se déconnecter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay semi-transparent quand le menu est ouvert */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden z-20 ${
          isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Menu mobile coulissant depuis la gauche */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* En-tête du menu mobile */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Menu</span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Fermer le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Liste des liens dans le menu mobile */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Revenus et Depenses
                </a>
              </li>
              <li>
                <a
                  href="/project"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Gestion du Budget
                </a>
              </li>
              <li>
                <a
                  href="/project"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleLogout}
                >
                  Déconnexion
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
