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
    console.log("query: " + query)
    // setTimeout()  //Enable to show loading spinner
    loadData();
    console.log(data);
  };

  const loadData = async () => {
    await fetch(`http://localhost:3000/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
      
    })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error('Error: ' + err.message))
    .finally(setLoading(false));

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
        title: key.replace(/_/g, " ").toUpperCase(),
        dataIndex: key,
        sorter: (a, b) => a.key.localeCompare(b.key)
      }
      cols.push(col)
    }
  }

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


      {data.length === 0 ? null: 
        (loading ? <span className="loader"></span> : 
          <Table
            className="results-table"
            dataSource={data}
            columns={columns}
            scroll={{
              x: 1,
            }}
          />
        )
      }
      
    </>
  )
};

export default SearchView;