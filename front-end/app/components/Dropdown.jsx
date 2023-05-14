'use client'
import Link from "next/link"
import { useState } from "react"
import { AiFillSetting, AiOutlineBarChart, AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"

const Dropdown = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="dropdown">

        {open ? (<AiOutlineClose 
          className="icon menu-icon"
          onClick={() => setOpen(!open)}
        />) : (
          <AiOutlineMenu 
          className="icon menu-icon"
          onClick={() => setOpen(!open)}
        />
        )}

        {open ? (
          <div className="dropdown-icons">
            <Link href='/'className="dropdown-link" onClick={() => setOpen(!open)}>
              <AiOutlineSearch className="icon dropdown-icon" />
              <p>Search</p>
            </Link>
            <Link href='/data' className="dropdown-link" onClick={() => setOpen(!open)}>
              <AiOutlineBarChart className="icon dropdown-icon"/>
              <p>Data</p>
            </Link>
            <Link href='/admin' className="dropdown-link" onClick={() => setOpen(!open)}>
              <AiFillSetting className="icon dropdown-icon"/>
              <p>Admin</p>
            </Link>
          </div>
        )
        : null}

      </div>
    </>
  )
}

export default Dropdown