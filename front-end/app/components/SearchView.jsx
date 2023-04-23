'use client';
import { Table } from "antd";
import { useState } from "react";

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [columns, setColumns] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm)
  };

  return (
    <>
      <form className="search-form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar"
          onChange={text => setSearchTerm(text.target.value)}
          placeholder="Search the database"
        />
        <button type="submit" className="submit-btn">Search</button>
      </form>

      <Table 
        dataSource={results}
        columns={columns}
        className="results-table"
      />
    </>
  )
};

export default SearchView;