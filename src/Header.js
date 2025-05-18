import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css";   // if you make one

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">НУБіП</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Detection Form
              </Link>
            </li>
            <li>
              <Link to="/results" className="hover:underline">
                Results
              </Link>
            </li>
            <li>
              <Link to="/results-data" className="hover:underline">
                Table view
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
