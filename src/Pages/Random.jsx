
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGiftRandom } from "../Api/getApi";

const Random = () => {
    const dispatch = useDispatch()
    const giftDataRandom = useSelector(state => state.giftRandomSlice)

useEffect(() => {
    fetchGiftRandom(dispatch)
}, [dispatch]);

return (
        <>
            <h1>Random</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                            !!giftDataRandom.start && giftDataRandom ?
                            <img key={giftDataRandom.list.data.id} src={giftDataRandom.list.data.images.original.url} alt={giftDataRandom.list.data.title} />
                            : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Random