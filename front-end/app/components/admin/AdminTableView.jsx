'use client'
import { React, useState } from 'react'
import { Button, Table, Popconfirm, message } from 'antd'
import { FetchQueryData } from '../../api/FetchQueryData'
import { DeleteRecord } from '../../api/DeleteRecord'

const AdminView = (table) => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [editingKey, setEditingKey] = useState('')

  const loadData = async () => {
    setNoResultsFound(false)
    setError(false)
    setLoading(true)

    try {
      const res = await FetchQueryData(query)
      const dataWId = res.map((item, index) => ({
        ...item,
        id: index
      }))
      console.log(dataWId)
      setData(dataWId)

      if (res.length > 0) {
        const columnKeys = Object.keys(res[0])
        const dynamicColumns = [
          ...columnKeys.map((key) => ({
            title: key,
            dataIndex: key,
            sorter: (a, b) => a[key].localeCompare(b[key]),
            key,
            editable: true
          }))]
        setColumns(dynamicColumns)
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

  const handleSave = (record) => {
    const row = data.find((item) => item.id === record.id)
    // console.log(data)
    console.log(record)
    console.log('record id: ' + record.id)
    // console.log(row)
    if (!row) {
      message.error('Invalid row!')
      return
    }
    console.log('Valid row.')
    const newData = [...data]
    const index = newData.findIndex((item) => record.id === item.id)

    if (index > -1) {
      console.log(index)
      // Update existing row
      const item = newData[index]
      newData.splice(index, 1, { ...item, ...row })
      setData(newData)
      setEditingKey('')
    } else {
      // Add new row
      newData.push(row)
      setData(newData)
      setEditingKey('')
    }
  }

  const isEditing = (record) => record.id === editingKey

  const edit = (record) => {
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const columnsWithActions = [
    ...columns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => {
        const editable = isEditing(record)

        return editable
          ? (
          // Render save and cancel links for editing
          <span>
            <Button type='link' onClick={() => handleSave(record)}>Save</Button>
            <Popconfirm
              title="Are you sure you want to cancel?"
              onConfirm={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type='link' danger>Cancel</Button>
            </Popconfirm>
          </span>
            )
          : (
          // Render edit and delete links for non-editing
          <span>
            <Button type='link'onClick={() => edit(record)}>Edit</Button>
            <Popconfirm
              title="Are you sure you want to delete this record?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type='link' danger>Delete</Button>
            </Popconfirm>
          </span>
            )
      }
    }
  ]

  const columnsWithEditableCells = columnsWithActions.map((column) => {
    if (!column.editable) {
      return column
    }

    return {
      ...column,
      onCell: (record) => ({
        record,
        dataIndex: column.dataIndex,
        title: column.title,
        editing: isEditing(record)
      })
    }
  })

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
                components={{
                  body: {
                    cell: EditableCell
                  }
                }}
                className='results-table'
                dataSource={data}
                columns={columnsWithEditableCells}
                bordered
                scroll={{
                  x: 1
                }}
                pagination={{
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showSizeChanger: true,
                  defaultPageSize: 10,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} results`
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

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing
        ? (
            // Render editable cell for editing
            <div>
              {title === 'key'
                ? (
                    // Make key column non-editable
                    record[dataIndex]
                  )
                : (
                // Render input for other editable columns
                <div className='edit-cell' suppressContentEditableWarning contentEditable>{record[dataIndex]}</div>
                  )}
            </div>
          )
        : (
            // Render non-editable cell
            children
          )}
    </td>
  )
}

export default AdminView
