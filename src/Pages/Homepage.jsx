import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGiftTrending, fetchMyGiftsList } from "../Api/getApi";

const Homepage = () => {
    const dispatch = useDispatch()
    const giftData = useSelector(state => state.giftSlice)
    const myGiftData = useSelector(state => state.giftNewSlice)
    const serverUrl = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        fetchGiftTrending(dispatch)
        fetchMyGiftsList(dispatch, serverUrl)
    }, [dispatch]);

return (
        <>
            <h1>Hola Mundo</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Recently uploaded gifs</h3>
                        {
                            myGiftData.list.length > 0 && myGiftData.list.map((gift, index) => {
                                if (index < 5) {
                                    return (
                                        <img key={gift._id} src={gift.thumbnail} alt={gift.name} />
                                    )
                                }
                            })
                        }
                        <h3>Trendings</h3>
                        {
                            !!giftData.start && giftData.list.data.map((gift, index) => {
                                if (index < 10) {
                                    return (
                                        <img key={gift.id} src={gift.images.original.url} alt={gift.title} />
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