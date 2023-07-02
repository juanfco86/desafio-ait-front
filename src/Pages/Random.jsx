
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGifRandom } from "../Api/getApi";
import { Link } from "react-router-dom";

const Random = () => {
    const dispatch = useDispatch()
    const gifDataRandom = useSelector(state => state.gifRandomSlice)

    useEffect(() => {
        fetchGifRandom(dispatch)
    }, [dispatch]);

    return (
        <>
            <h1>Random</h1>
            <div className="random--container">
                {
                    !!gifDataRandom.start && gifDataRandom ?
                        (
                            <>
                                <div key={gifDataRandom.list.data.id} className="row random--img">
                                    <Link className="random--img__title link--style" target="_blank" to={gifDataRandom.list.data.url}>{gifDataRandom.list.data.title}</Link>
                                    <img className="random--img__size" src={gifDataRandom.list.data.images.original.url} alt={gifDataRandom.list.data.title} />
                                </div>
                            </>
                        )
                        : 'Loading...'
                }
            </div>
        </>
    )
}

export default Random