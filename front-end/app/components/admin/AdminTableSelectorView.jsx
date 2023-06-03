'use client'
import React from 'react'
import Link from 'next/link'

const AdminTableSelector = () => {
  const tables = [
    {
      name: 'Pole',
      db_name: 'pole'
    },
    {
      name: 'Pole Drawings',
      db_name: 'pole_drawings'
    },
    {
      name: 'Line',
      db_name: 'line'
    },
    {
      name: 'Drawings',
      db_name: 'drawings'
    }
  ]

  return (
    <div className='container'>
      <div className="table-selector-container">
        <p>Select a table to interact with:</p>
        <div className="table-btns">
          {tables.map((table, index) => {
            return (
              <Link className='table-link' key={index} href={{ pathname: '/admin/table', query: { name: table.name, table: table.db_name } }}>
                <button className='table-btn'>{table.name}</button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminTableSelector
