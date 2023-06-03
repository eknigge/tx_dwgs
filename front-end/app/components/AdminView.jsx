'use client'
import { React, useState } from 'react'
import { Button, Table, Popconfirm, message } from 'antd'
import { FetchQueryData } from '../api/FetchQueryData'
import { DeleteRecord } from '../api/DeleteRecord'

const AdminView = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)
  const [apiKey, setApiKey] = useState('')

  const loadData = async () => {
    setNoResultsFound(false)
    setError(false)
    setLoading(true)

    try {
      const res = await FetchQueryData(query)
      if (res.length > 0) {
        const columnKeys = Object.keys(res[0])
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
        setData(res)
      } else {
        setNoResultsFound(true)
        setColumns([])
        setData([])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setData([])
      setLoading(false)
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loadData()
  }

  const handleDelete = async (record) => {
    if (apiKey.length > 0) {
      let rec = ''
      for (const key in record) {
        rec = record[key]
        break
      }
      await DeleteRecord(apiKey, rec)
      await loadData()
    } else {
      message.error('Enter an API key to delete a record.')
    }
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
