'use client';
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <form className="search-form" action="">
        <input
          type="text"
          className="searchbar"
          onChange={text => setSearchTerm(text.target.value)}
          placeholder="Search the database"
        />
        <button type="submit" className="submit-btn">Search</button>
      </form>
    </>
  )
}

export default SearchBar;