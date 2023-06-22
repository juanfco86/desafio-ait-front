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

    useEffect(() => {
        fetchGifTrending(dispatch)
        fetchMyGifsList(dispatch, serverUrl)
    }, [dispatch, serverUrl]);


    return (
        <>
            <h1>Gif Web</h1>
            <h3>Recently uploaded gifs</h3>
            <div className="container">
                {
                    myGifData.list.length > 0 && myGifData.list.map((gif, index) => {
                        if (index < 6) {
                            return (
                                <>
                                    <div key={gif._id || index} className="row trending--grid__item">
                                        <Link to={gif.thumbnail} target="_blank">
                                            <p className="trending--gif__title">{gif.name}</p>
                                            <img key={gif._id} src={gif.thumbnail} alt={gif.name} />
                                        </Link>
                                    </div>
                                </>
                            )
                        } else {
                            return ''
                        }
                    })
                }
            </div>
            <h3>Trendings</h3>
            <div className="container">
                {
                    !!gifData.start && gifData.list.data.map((gif, index) => {
                        if (index < 9) {
                            return (
                                <>
                                    <div key={gif._id || index} className="row trending--grid__item">
                                        <Link to={gif.url} target="_blank">
                                            <p>{gif.title}</p>
                                            <img key={gif.id} src={gif.images.original.url} alt={gif.title} />
                                        </Link>
                                    </div>
                                </>
                            )
                        } else {
                            return ''
                        }
                    })
                }
            </div>
        </>
    )
}

export default Homepage