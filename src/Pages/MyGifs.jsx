
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyGifsList } from "../Api/getApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MyGifs = () => {
    const dispatch = useDispatch()
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const myGifData = useSelector(state => state.gifNewSlice)
    const { user, loading } = useAuth0();
    const myPersonalGif = user ? myGifData.list.filter((gif) => gif.userEmail === user.email) : []
    
    useEffect(() => {
        fetchMyGifsList(dispatch, serverUrl)
    }, [dispatch, serverUrl]);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>My gifs</h1>
            <div className="container">
                        {
                            myPersonalGif && myPersonalGif.length > 0 ? myPersonalGif.map((gif, index) => {
                                return (
                                    <div key={gif._id || index} className="row trending--grid__item">
                                        <Link to={gif.thumbnail} target="_blank">
                                            <p className="trending--gif__title">{gif.name}</p>
                                            <img src={gif.thumbnail} alt={gif.name} />
                                        </Link>
                                    </div>
                                )
                            }) : ''
                        }
            </div>
        </>
    )
}

export default MyGifs