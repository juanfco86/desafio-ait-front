
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyGiftsList } from "../Api/getApi";
import { useAuth0 } from "@auth0/auth0-react";

const MyGifts = () => {
    const dispatch = useDispatch()
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const myGiftData = useSelector(state => state.giftNewSlice)
    const { user } = useAuth0();
    const myPersonalGift = myGiftData.list.filter((gift) => gift.userEmail === user.email)

    useEffect(() => {
        fetchMyGiftsList(dispatch, serverUrl)
    }, [dispatch, serverUrl]);


    return (
        <>
            <h1>My Gifts</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                    {
                        myPersonalGift.length > 0 && myPersonalGift.map((gift) => {
                            return (
                                <>
                                    <h5>{gift.name}</h5>
                                    <img key={gift._id} src={gift.thumbnail} alt={gift.name} />
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

export default MyGifts