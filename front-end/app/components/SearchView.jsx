'use client'
import { React, useState } from 'react'
import { Table } from 'antd'

const SearchView = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    setNoResultsFound(false)
    setError(false)
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query
        })
      })
      const jsonData = await response.json()
      setData(jsonData)
      setLoading(false)

      if (jsonData.length > 0) {
        const columnKeys = Object.keys(jsonData[0])
        const dynamicColumns = columnKeys.map((key) => ({
          key,
          title: <b>{key}</b>,
          dataIndex: key,
          className: 'results-table-header',
          sorter: (a, b) => a[key].localeCompare(b[key])
        }))
        setColumns(dynamicColumns)
      } else {
        setNoResultsFound(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setData([])
      setLoading(false)
      setError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <>
      <form className='search-form' action='' onSubmit={handleSubmit}>
        <input
          type='text'
          className='searchbar'
          onChange={text => setQuery(text.target.value)}
          placeholder='Search the database'
        />
        <button type='submit' className='submit-btn'>Search</button>
      </form>

      {noResultsFound
        ? <p className='warning-text'>No Results Found</p>
        : null}

      {data.length === 0
        ? null
        : (
            loading
              ? <span className='loader'></span>
              : <Table
                  className='results-table'
                  dataSource={data}
                  columns={columns}
                  rowClassName={() => 'results-table-row'}
                  scroll={{
                    x: 1
                  }}
                  pagination={{
                    pageSizeOptions: ['10', '20', '50', '100'], // Specify the options for items per page
                    showSizeChanger: true, // Show the page size changer component
                    defaultPageSize: 10, // Set the default number of items per page
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} results` // Display the total number of results
                  }}
                />
          )
      }

      {error
        ? <p className='warning-text'>Error fetching data, please try again.</p>
        : null
      }
    </>
  )
}

export default SearchView
