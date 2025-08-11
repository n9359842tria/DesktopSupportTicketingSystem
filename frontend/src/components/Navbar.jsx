import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSearchClick = () => {
    navigate('/search');  // Navigate inside the SPA, same tab
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Left side: Site title */}
      <Link to="/" className="text-2xl font-bold">
        Desktop Support Ticketing System
      </Link>

      {/* Right side: Hamburger menu */}
      <div className="ml-auto relative">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
            onClick={() => setMenuOpen(false)}
          >
            <ul className="py-1 text-gray-700">
              <li>
                <button
                  onClick={handleSearchClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Service Ticket Search
                </button>
              </li>

              {user ? (
                <>
                  <li>
                    <Link to="/tickets" className="block px-4 py-2 hover:bg-gray-200">
                      New Service Ticket
                    </Link>
                  </li>
                  <li>
                    <Link to="/mytickets" className="block px-4 py-2 hover:bg-gray-200">
                      My Tickets
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
