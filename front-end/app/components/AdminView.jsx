'use client'
import { React, useState } from 'react'
import { Button, Table, Popconfirm } from 'antd'
import { DeleteRecord } from '../api/DeleteRecord'

const AdminView = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)
  const [apiKey, setApiKey] = useState('')

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
        const dynamicColumns = [
          ...columnKeys.map((key) => ({
            title: key,
            dataIndex: key,
            sorter: (a, b) => a[key].localeCompare(b[key]),
            key
          })),
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
              <Popconfirm
                title='Are you sure you want to delete this record?'
                onConfirm={() => handleDelete(record)}
                okText='Yes'
                cancelText='No'
              >
                <Button type='link' danger>
                  Delete
                </Button>
              </Popconfirm>
            )
          }
        ]
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

  const handleDelete = async (record) => {
    let rec = ''
    for (const key in record) {
      rec = record[key]
      break
    }
    await DeleteRecord(apiKey, rec)
    fetchData()
  }

  return (
    <>
      <form className='search-form' action='' onSubmit={handleSubmit}>
        <input
          type='password'
          className='searchbar'
          onChange={text => setApiKey(text.target.value)}
          placeholder='Enter API Key (not needed to search)'
        />
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
        : (loading
            ? <span className='loader'></span>
            : <Table
                className='results-table'
                dataSource={data}
                columns={columns}
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

export default AdminView
