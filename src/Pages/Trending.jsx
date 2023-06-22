import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGifTrending } from "../Api/getApi";
import { Link } from "react-router-dom";

const Trending = () => {
    const dispatch = useDispatch()
    const gifData = useSelector(state => state.gifSlice)

    useEffect(() => {
        fetchGifTrending(dispatch)
    }, [dispatch]);

    return (
        <>
            <h1>Trending</h1>
            <div className="container">
                    {
                        !!gifData.start && gifData.list.data.map((gif, index) => {
                            return (
                                <>
                                <div key={gif._id || index} className="row trending--grid__item">
                                    <Link to={gif.url} target="_blank">
                                        <p className="trending--gif__title">{gif.title}</p>
                                        <img src={gif.images.original.url} alt={gif.title} />
                                    </Link>
                                </div>
                                </>
                            )
                        })
                    }
            </div>
        </>
    )
}

export default Trending