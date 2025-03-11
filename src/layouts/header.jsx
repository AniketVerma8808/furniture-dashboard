import { Menu, User } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

export const Header = ({ collapsed, setCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      {/* Menu Toggle Button */}
      <button
        className="btn-ghost size-10 flex items-center justify-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className={collapsed ? "rotate-180 transition-transform" : ""} />
      </button>

      {/* User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="btn-ghost size-10 flex items-center justify-center"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <User size={20} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-300 bg-white shadow-lg ">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func.isRequired,
};
