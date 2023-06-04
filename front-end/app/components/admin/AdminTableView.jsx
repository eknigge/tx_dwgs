'use client'
import { React, useState } from 'react'
import { Button, Table, Popconfirm, message } from 'antd'
import { FetchTableData } from '../../api/FetchTableData'
import { DeleteRecord } from '../../api/DeleteRecord'
import AdminTableSelector from './AdminTableSelector'
import { AiFillDelete, AiFillEdit, AiFillSave, AiFillCloseCircle } from 'react-icons/ai'

const AdminTableView = () => {
  const [table, setTable] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [editingKey, setEditingKey] = useState('')

  const handleTableSelection = (tableName) => {
    console.log('Load data for table: ' + tableName)
    setTable(tableName)
    loadData(tableName)
  }

  const loadData = async (table) => {
    setNoResultsFound(false)
    setError(false)
    setLoading(true)

    try {
      const res = await FetchTableData(table)
      setData(res)

      if (res.length > 0) {
        const columnKeys = Object.keys(res[0])
        const dynamicColumns = [
          ...columnKeys.map((key) => ({
            title: key.replace(/_/g, ' ').toUpperCase(),
            dataIndex: key,
            sorter: (a, b) => {
              const aValue = a[key]
              const bValue = b[key]
              if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue
              } else {
                return aValue.localeCompare(bValue)
              }
            },
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
    console.log(apiKey)
    if (apiKey.length > 0) {
      const deleteProp = Object.keys(record)[1]
      const deleteValue = record[deleteProp]
      console.log(deleteValue)
      await DeleteRecord(apiKey, deleteValue)
      await loadData(table)
    } else {
      message.error('Enter an API key to delete a record.')
    }
  }

  const handleSave = (record) => {
    const row = data.find((item) => item.id === record.id)
    console.log('Edit record: ', { ...record })
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
      className: 'actions-column',
      render: (_, record) => {
        const editable = isEditing(record)

        return editable
          ? (
              // Render save and cancel links for editing
              <span className='action-btn-container'>
                <Button className='action-btn' type='link' onClick={() => handleSave(record)}>
                  <AiFillSave className='action-btn-icon' />
                  <p className="action-btn-text">Save</p>
                </Button>
                <Popconfirm
                  title="Are you sure you want to cancel?"
                  onConfirm={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className='action-btn' type='link' danger>
                    <AiFillCloseCircle className='action-btn-icon' />
                    <p className="action-btn-text">Cancel</p>
                  </Button>
                </Popconfirm>
              </span>
            )
          : (
              // Render edit and delete links for non-editing
              <span className='action-btn-container'>
                <Button className='action-btn' type='link'onClick={() => edit(record)}>
                  <AiFillEdit className='action-btn-icon' />
                  <p className="action-btn-text">Edit</p>
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this record?"
                  onConfirm={() => handleDelete(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className='action-btn' type='link' danger>
                    <AiFillDelete className='action-btn-icon' />
                    <p className="action-btn-text">Delete</p>
                  </Button>
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
      <AdminTableSelector onButtonClick={handleTableSelection} />

      <form className='search-form' action='' onSubmit={handleSubmit}>
        <input
          type='password'
          className='searchbar'
          onChange={text => setApiKey(text.target.value)}
          placeholder='Enter API Key'
        />
      </form>

      {noResultsFound
        ? <p className='warning-text'>No Results Found</p>
        : null
      }

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

export default AdminTableView
