'use client';
import { Table } from "antd";
import { useEffect, useState } from "react";

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setNoResultsFound(false);
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        })
      });
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);

      if (jsonData.length > 0) {
        const columnKeys = Object.keys(jsonData[0]);
        const dynamicColumns = columnKeys.map((key) => ({
          key: key,
          title: key,
          dataIndex: key,
          sorter: (a, b) => a[key].localeCompare(b[key]),
        }));
        setColumns(dynamicColumns);
      } else {
        setNoResultsFound(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

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

      {noResultsFound ? <p className="results-not-found">No Results Found</p>: null}

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