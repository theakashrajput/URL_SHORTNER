import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // optional icons from lucide-react

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white absolute top-0 left-0 w-full">
      <div className="w-full mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-xl font-semibold">
          URL Shortener
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
          </li>
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 cursor-pointer active:scale-95 ease-in transform duration-150"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 cursor-pointer active:scale-95 ease-in transform duration-150"
            >
              Login
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-gray-800">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400"
          >
            Dashboard
          </Link>
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
                navigate("/", { replace: true });
              }}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 cursor-pointer active:scale-95 ease-in transform duration-150"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
