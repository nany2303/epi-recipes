import React, { useState } from "react";
import "./Header.css"; // Assuming you'll add custom styles in this file
import { FaSearch } from "react-icons/fa"; // You can install react-icons if not already installed

const Header = ({ search, setTitle, title }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(title)
    }
  }
  return (
    <header className="header">
      <div className="search-bar">
        <FaSearch onClick={() => search(title)} className="search-icon" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Search..."
          className="search-input"
          onKeyPress={handleKeyPress}
        />
      </div>
    </header>
  );
};

export default Header;
