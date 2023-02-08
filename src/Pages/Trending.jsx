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
                <div className="row">
                        {
                            !!gifData.start && gifData.list.data.map((gif, index) => {
                                return (
                                    <>
                                    <div key={gif._id || index} className="row">
                                        <Link to={gif.url}>{gif.title}</Link>
                                        <img src={gif.images.original.url} alt={gif.title} />
                                    </div>
                                    </>
                                )
                            })
                        }
                </div>
            </div>
        </>
    )
}

export default Trending