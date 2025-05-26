import React from 'react';

const SearchBar = ({onChange, value, placeholder}) => {
  return (
    <div className="flex justify-center p-6">
      <div className="relative w-full max-w-lg">
        <input
          type="text"  onChange={onChange}
          value={value} placeholder={placeholder}
        
          className="w-full px-5 py-3 rounded-full shadow-inner bg-gray-100 text-gray-800 placeholder-gray-500 outline-none transition duration-200 ease-in-out
                     focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]"
        />
       
      </div>
    </div>
  );
};

export default SearchBar;
