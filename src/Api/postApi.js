import { setAddGift } from "../redux/features/gift/giftNewSlice";

export const fetchAddGift = async (serverURL, newGift, getAccessTokenSilently, dispatch) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverURL}/api/gift/new`, {
            method: "POST",
            body: JSON.stringify(newGift),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data);
        dispatch(setAddGift(data.info));
    } catch (error) {
        console.log(error);
    }
}