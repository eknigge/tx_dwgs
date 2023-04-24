'use client';
import { Table } from "antd";
import { useEffect, useState } from "react";

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm)
  };

  const cols = []
  // Pull column/field names
  function loadCols(input) {
    for (const key in input[0]) {
      const col = {
        key: key,
        title: key,
        dataIndex: key,
        sorter: {
          compare: (a, b) => a.key.localeCompare(b.key)
        }
      }
      cols.push(col)
    }
  }

  useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/?search`)
    .then(res => res.json())
    .then(data => setData(data.results))
    .catch(err => console.log(err.message));

    if (data.length > 0) {
      loadCols(data);
      setColumns(cols);
    }
  }, [data]);

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


      {data.length === 0 ? 
        <p>Loading</p> : 
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