import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: "15px", display: "block" }}
    />
  );
}

export default SearchBar;