'use client';
import { Table } from "antd";
import { useEffect, useState } from "react";

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Query: " + query)
    // setTimeout()  //Enable to show loading spinner
    loadData();
    console.log(data);
    
    setLoading(false);
  };

  const loadData = () => {
    fetch(`http://localhost:3000/${query}`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error('Error: ' + err.message));

    if (data.length > 0) {
      loadCols(data);
      setColumns(cols);
    }
  }

  // Pull column/field names
  const cols = []
  function loadCols(input) {
    for (const key in input[0]) {
      const col = {
        key: key,
        title: key.replace(/_/g, " "),
        dataIndex: key,
        sorter: (a, b) => a.key.localeCompare(b.key)
      }
      cols.push(col)
    }
  }

  // useEffect(() => {
  //   handleSubmit;
  // });

  return (
    <>
      <form className="search-form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar"
          onChange={text => setQuery(text.target.value)}
          placeholder="Search the database"
        />
        <button type="submit" className="submit-btn">Search</button>
      </form>


      {loading ? 
        <span className="loader"></span> : 
        <Table
        className="results-table"
        dataSource={data}
        columns={columns}
        scroll={{
          x: 1,
        }}
      />
      }
      
    </>
  )
};

export default SearchView;