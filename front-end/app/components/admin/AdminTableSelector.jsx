'use client'
import React, { useState } from 'react'
import { AiOutlineCaretRight, AiOutlineCaretUp } from 'react-icons/ai'

const AdminTableSelector = ({ onButtonClick }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  const handleSelection = (name) => {
    toggle()
    // console.log('Table selected: ' + name)
    onButtonClick(name)
  }

  const tables = [
    { name: 'Pole', db_name: 'pole' }, { name: 'Drawings', db_name: 'drawings' },
    { name: 'Pole Drawings', db_name: 'pole_drawings' }, { name: 'Line', db_name: 'line' }
  ]

  return (
    <div className='table-selector-container'>
      {open
        ? (
          <div className="table-selector active">
            <button className='btn btn-cancel select-btn' onClick={toggle}>
              <p className="select-btn-text">Cancel Select</p>
              <AiOutlineCaretUp className='select-btn-icon'/>
            </button>
            <div className="table-btns">
              {tables.map((table, index) => {
                return (
                  <button className='btn btn-standard' key={index} onClick={() => handleSelection(table.db_name)}>
                    {table.name}
                  </button>
                )
              })}
            </div>
          </div>
          )
        : (
            <div className='table-selector'>
              <button className='btn btn-standard select-btn' onClick={toggle}>
                <p className="select-btn-text">Select Table</p>
                <AiOutlineCaretRight className='select-btn-icon' />
              </button>
            </div>
          )}
    </div>
  )
}

export default AdminTableSelector
