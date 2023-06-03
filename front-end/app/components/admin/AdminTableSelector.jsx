'use client'
import React from 'react'
import Link from 'next/link'

const AdminTableSelector = () => {
  const tables = ['Pole', 'Pole Drawings', 'Line', 'Drawings']

  return (
    <div className='container'>
      <div className="table-selector-container">
        <p>Select a table to interact with:</p>
        <div className="table-btns">
          {tables.map((table, index) => {
            return (
              <Link className='table-link' key={index} href={{ pathname: '/admin/table', query: { table } }}>
                <button className='table-btn'>{table}</button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminTableSelector
