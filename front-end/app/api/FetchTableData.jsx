export const FetchTableData = async (table) => {
  try {
    const response = await fetch('http://localhost:3000/tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        table
      })
    })
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
