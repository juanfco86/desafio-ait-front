
const Search = ({ setSearch }) => {

    return (
        <form className="input-group">
            <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="input-group-text">Submit</button>
        </form>
    )
}

export default Search