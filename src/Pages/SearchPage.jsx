import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGifSearch } from "../Api/getApi";

const SearchPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const paramsValue = params.search
    const searchData = useSelector(state => state.gifSearchSlice)
// console.log(searchData.list);
    useEffect(() => {
        // fetchGifSearch(dispatch, paramsValue)
        const fetchSearch = async () => {
            try {
                await fetchGifSearch(dispatch, paramsValue)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSearch();
    }, [dispatch, paramsValue]);

    return (
        <>
            <h1>Results</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                            searchData.list && searchData.list.data && searchData.list.data.length > 0 && searchData.list.data.map((gif, index) => {
                                return (
                                    <>
                                        <div key={gif.id || index} className="row">
                                            <Link to={gif.url}>{gif.title}</Link>
                                            <img src={gif.images.original.url} alt={gif.title} />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage