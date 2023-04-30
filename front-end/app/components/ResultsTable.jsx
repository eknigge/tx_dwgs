'use client'
import { useState } from "react";
import { Table } from "antd";

import data from "../../../back-end/sample_json/drawings_by_line_number_result.json"

const ResultsTable = () => {
  const [Data, setData] = useState(data);
  const columns = [
    {
      key: "name", 
      title: "Drawing Name", 
      dataIndex: "drawing_name", 
      sorter: {
        compare: (a, b) => a.drawing_name.localeCompare(b.drawing_name)
      }
    },
    {
      key: "title", 
      title: "Drawing Title", 
      dataIndex: "drawing_title",
      sorter: {
        compare: (a, b) => a.drawing_title.localeCompare(b.drawing_title)
      }
    }
  ]

  return (
    <>
      <Table dataSource={Data} columns={columns} className="results-table"/>
    </>
  )
}

export default ResultsTable;