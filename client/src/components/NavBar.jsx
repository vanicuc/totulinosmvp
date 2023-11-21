import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import './NavBar.css'

export default function NavBar() {
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {isLoggedIn && (
            <>
              <li className="EachTrips-link"><Link to="/Eachtrips">Trips</Link></li>
              <li className="logout-button"><span onClick={onLogout}>Logout</span></li>
          </>
          )}
      </ul>
    </nav>
  );
}
