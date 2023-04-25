import ResultsTable from "./components/ResultsTable"
import SearchBar from "./components/SearchBar"
import Background from "./components/Background"

const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Database Search</h1>
        <SearchBar />
        <div className="result-table-container">
          <ResultsTable />
        </div>
      </div>
    </>
  )
}

export default HomePage

//landing page