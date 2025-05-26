import React from 'react';
import logo from '../assets/logo.png'; // adjust path if needed
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="sticky top-0 mb-4 z-50 w-full backdrop-blur-md bg-gray/60 shadow-sm border-b border-gray-200">
        
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* logo  */}
        <Link to={'/'}>
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
          <span className="text-xl font-mono text-black tracking-wide">BukShelf</span>
        </div>
        </Link>

       {/* button  */}
        <Link to={'/add-page'}>
        <button className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition">
          + Add Book
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
