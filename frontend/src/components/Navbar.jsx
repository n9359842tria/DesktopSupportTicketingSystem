import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchTerm);
    // You can implement search logic here
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left side: Site title */}
      <Link to="/" className="text-2xl font-bold">
        Desktop Support Ticketing System
      </Link>

      {/* Middle: Search box */}
      <form onSubmit={handleSearchSubmit} className="mx-6 flex-grow max-w-lg">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded text-black"
        />
      </form>

      {/* Right side: Navigation links */}
      <div className="flex items-center">
        {user ? (
          <>
            <Link to="/tickets" className="mr-4">
              Create Ticket
            </Link>
            <Link to="/mytickets" className="mr-4">
              My Tickets
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;