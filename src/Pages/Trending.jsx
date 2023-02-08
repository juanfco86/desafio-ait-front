import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGiftTrending } from "../Api/getApi";

const Trending = () => {
    const dispatch = useDispatch()
    const giftData = useSelector(state => state.giftSlice)

useEffect(() => {
    fetchGiftTrending(dispatch)
}, [dispatch]);

return (
        <>
            <h1>Trending</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                    {
                        !!giftData.start && giftData.list.data.map((gift) => {
                            return (
                                <img key={gift.id} src={gift.images.original.url} alt={gift.title} />
                                )
                            })
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trending