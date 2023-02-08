import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGifTrending, fetchMyGifsList } from "../Api/getApi";
import { Link } from "react-router-dom";

const Homepage = () => {
    const dispatch = useDispatch()
    const gifData = useSelector(state => state.gifSlice)
    const myGifData = useSelector(state => state.gifNewSlice)
    const serverUrl = process.env.REACT_APP_SERVER_URL
    // const searchData = useSelector(state => state.gifSearchSlice)

    // console.log(searchData);

    useEffect(() => {
        fetchGifTrending(dispatch)
        fetchMyGifsList(dispatch, serverUrl)
    }, [dispatch]);

    return (
        <>
            <h1>Hola Mundo</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Recently uploaded gifs</h3>
                        {
                            myGifData.list.length > 0 && myGifData.list.map((gif, index) => {
                                if (index < 5) {
                                    return (
                                        <>
                                            <div key={gif._id || index} className="row">
                                                <Link to={gif.thumbnail}>{gif.name}</Link>
                                                <img key={gif._id} src={gif.thumbnail} alt={gif.name} />
                                            </div>
                                        </>
                                    )
                                }
                            })
                        }
                        <h3>Trendings</h3>
                        {
                            !!gifData.start && gifData.list.data.map((gif, index) => {
                                if (index < 5) {
                                    return (
                                        <>
                                            <div key={gif._id || index} className="row">
                                                <Link to={gif.url}>{gif.title}</Link>
                                                <img key={gif.id} src={gif.images.original.url} alt={gif.title} />
                                            </div>
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage