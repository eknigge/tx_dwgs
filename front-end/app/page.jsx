<<<<<<< HEAD
import ResultsTable from "./components/ResultsTable"
import SearchBar from "./components/SearchBar"
=======
import SearchView from "./components/SearchView"
>>>>>>> 340d43d61175c83bddf4bea5211ba6fa6dc08092

const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Database Search</h1>
<<<<<<< HEAD
        <SearchBar />
        <div className="result-table-container">
          <ResultsTable />
        </div>
=======
        <SearchView />
>>>>>>> 340d43d61175c83bddf4bea5211ba6fa6dc08092
      </div>
    </>
  )
}

export default HomePage