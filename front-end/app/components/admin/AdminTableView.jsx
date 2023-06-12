'use client'
import { React, useState } from 'react'
import { Button, Table, Popconfirm, message } from 'antd'
import { FetchTableData } from '../../api/FetchTableData'
import { DeleteRecord } from '../../api/DeleteRecord'
import AdminTableSelector from './AdminTableSelector'
import AddRecord from './AddRecord'
import { AiFillDelete, AiFillEdit, AiFillSave, AiFillCloseCircle } from 'react-icons/ai'
import { UpdateRecord } from '@/app/api/UpdateRecord'

const AdminTableView = () => {
  const [table, setTable] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [editingKey, setEditingKey] = useState('')
  const [originalRecord, setOriginalRecord] = useState(null)

  const handleTableSelection = (tableName) => {
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
          ...columnKeys.map((key, index) => ({
            title: key.replace(/_/g, ' ').toUpperCase(),
            dataIndex: key,
            key,
            editable: index !== 0,
            sorter: (a, b) => {
              const aValue = a[key]
              const bValue = b[key]
              if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue
              } else {
                return aValue.localeCompare(bValue)
              }
            }
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

  const handleDelete = async (record) => {
    if (apiKey.length > 0) {
      const deleteProp = Object.keys(record)[1]
      const deleteValue = record[deleteProp]
      await DeleteRecord(apiKey, deleteValue)
      await loadData(table)
    } else {
      message.error('Enter an API key to delete a record.')
    }
  }

  const isEditing = (record) => getFirstKeyValue(record) === editingKey

  const edit = (record) => {
    const key = getFirstKeyValue(record)
    setEditingKey(key)
    setOriginalRecord(record)
  }

  const handleCellChange = (updatedRecord) => {
    // console.log('updatedRecord: ', updatedRecord)
    // console.log('originalRecord: ', originalRecord)
    const updatedData = data.map((item) => {
      if (getFirstKeyValue(item) === getFirstKeyValue(updatedRecord)) {
        return updatedRecord
      }
      return item
    })
    setData(updatedData)
  }

  const updateObjectCreator = (record) => {
    if (table === 'drawings') {
      const updatedDrawing = {
        drawing_name_existing: originalRecord.drawing_name,
        drawing_name_new: record.drawing_name,
        drawing_title: record.drawing_title,
        revision_number: record.revision_number,
        revision_date: record.revision_date
      }
      // console.log('Updated object: ', updatedObject)
      return updatedDrawing
    }
    if (table === 'line') {
      const updatedLine = {
        line_number_existing: originalRecord.line_number,
        line_number_new: record.line_number,
        line_name: record.line_name,
        line_abbreviation: record.line_abbreviation
      }
      return updatedLine
    }

    console.warn('NO TABLE MATCH, RECORD NOT UPDATED')
    return record
  }

  const handleSave = async (record) => {
    const updateObject = updateObjectCreator(record)
    await UpdateRecord(apiKey, table, updateObject)
    cancel()
  }

  const cancel = () => {
    setEditingKey('')
    setOriginalRecord(null)
    loadData(table)
  }

  const getFirstKeyValue = (obj) => {
    const firstKey = Object.keys(obj)[0]
    const firstValue = obj[firstKey]
    return firstValue
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
                <Popconfirm
                  title='Are you sure you want to save?'
                  onConfirm={() => handleSave(record)}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button className='action-btn action-btn-save' type='link'>
                    <AiFillSave className='action-btn-icon' />
                    <p className='action-btn-text'>Save</p>
                  </Button>
                </Popconfirm>
                <Button className='action-btn' type='link' onClick={cancel} danger>
                  <AiFillCloseCircle className='action-btn-icon' />
                  <p className='action-btn-text'>Cancel</p>
                </Button>
              </span>
            )
          : (
              // Render edit and delete links for non-editing
              <span className='action-btn-container'>
                <Button className='action-btn' type='link'onClick={() => edit(record)}>
                  <AiFillEdit className='action-btn-icon' />
                  <p className='action-btn-text'>Edit</p>
                </Button>
                <Popconfirm
                  title='Are you sure you want to delete this record?'
                  onConfirm={() => handleDelete(record)}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button className='action-btn' type='link' danger>
                    <AiFillDelete className='action-btn-icon' />
                    <p className='action-btn-text'>Delete</p>
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
        editing: isEditing(record),
        handleCellChange
      })
    }
  })

  return (
    <>
      <AdminTableSelector onButtonClick={handleTableSelection} />

      <input
        type='password'
        className='searchbar api-key-input'
        onChange={text => setApiKey(text.target.value)}
        placeholder='Enter API Key'
      />

      {noResultsFound
        ? <p className='warning-text'>No Results Found</p>
        : null
      }

      {data.length === 0
        ? null
        : (loading
            ? <span className='loader'></span>
            : <>
                <AddRecord fields={columns} />
                <Table
                  rowKey={(record) => getFirstKeyValue(record)}
                  components={{
                    body: {
                      cell: (props) => (
                        <EditableCell {...props} handleCellChange={handleCellChange} />
                      )
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
              </>
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
  handleCellChange,
  ...restProps
}) => {
  const handleChange = (event) => {
    const updatedRecord = { ...record }
    const value = event.target.textContent
    updatedRecord[dataIndex] = value
    handleCellChange(updatedRecord) // Call the callback function
  }

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
                <div
                  className='edit-cell'
                  suppressContentEditableWarning
                  contentEditable
                  onBlur={handleChange}
                >
                  {record[dataIndex]}
                </div>
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
