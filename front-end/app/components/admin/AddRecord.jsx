'use client'
import { Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

const AddRecord = (fields) => {
  const [labelArray, setLabelArray] = useState()
  const [adding, setAdding] = useState(false)

  const parseFields = () => {
    const noDisplayFields = ['actions', 'id']
    const newFields = fields.fields
    const labels = newFields.map(obj => obj.title)
    labels.shift()
    const filteredLabels = labels.filter(item => !noDisplayFields.map(i => i.toLowerCase()).includes(item.toLowerCase()))
    setLabelArray(filteredLabels)
    // console.log(labelArray)
  }

  const toggle = () => {
    setAdding(!adding)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Cool!')
  }

  const clearForm = () => {
    const addForm = document.getElementsByClassName('add-form')
    addForm[0].reset()
  }

  const handleAdd = () => {
    console.log('Record added.')
    clearForm()
  }

  useEffect(() => {
    parseFields()
  }, [])

  return (
    <div className="container">
      {adding
        ? <div className={`add-rec-container ${adding ? 'add-rec-container-active' : ''}`}>
            <button className='btn btn-cancel select-btn' onClick={toggle}>
              <p className="select-btn-text">Cancel Add</p>
              <AiOutlineMinusCircle className='select-btn-icon' />
            </button>
            <form className='add-form' action='' onSubmit={handleSubmit}>
              <div className="add-form-field-container">
                {labelArray.map((value, index) => (
                    <div key={index} className='add-form-field'>
                      <label className='add-field-label'>{value}:</label>
                      <input className='add-field-input edit-cell' type="text" name="" id="" required />
                    </div>
                ))}
              </div>
              <div className="add-clear-btn-container">
                <Popconfirm
                  title='Are you sure you want to add this record?'
                  onConfirm={handleAdd}
                  okText='Yes'
                  cancelText='No'
                >
                  <button className='btn btn-standard'>Add</button>
                </Popconfirm>
                <button className="btn btn-cancel" onClick={clearForm}>Clear</button>
              </div>
            </form>
          </div>
        : <div className='add-rec-container'>
            <button className='btn  btn-standard select-btn' onClick={toggle}>
              <p className="select-btn-text">Add Row</p>
              <AiOutlinePlusCircle className='select-btn-icon'/>
            </button>
          </div>}
    </div>
  )
}

export default AddRecord
