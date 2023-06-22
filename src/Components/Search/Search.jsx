import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchGifSearch } from "../../Api/getApi"

const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchValue = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        console.log(search);
        fetchGifSearch(dispatch, search)
        navigate(`/search/${search}`)
    }

    return (
        <form className="input-group mt-2 nav--search" onSubmit={searchValue}>
            <input type="text" className="form-control" placeholder="Search" name="search" />
            <button type="submit" className="input-group-text">Submit</button>
        </form>
    )
}

export default Search