import { setMyGiftList } from "../redux/features/gift/giftNewSlice";
import { setGiftRandom } from "../redux/features/gift/giftRandomSlice";
import { setGiftList, setGiftListSearch } from "../redux/features/gift/giftSlice";

export const fetchGetUser = async (serverUrl, token, user) => {
    try {
        const response = await fetch(`${serverUrl}/api/user/check/${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const responseData = await response.json()
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchGiftTrending = async (dispatch) => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&limit=15&rating=g`)
        const data = await response.json();
        dispatch(setGiftList(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchGiftSearch = async (dispatch, search) => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&q=${search}&limit=6&offset=0&rating=g&lang=en`)
        const data = await response.json()
        dispatch(setGiftListSearch(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchGiftRandom = async (dispatch) => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&tag=&rating=g`)
        const data = await response.json()
        dispatch(setGiftRandom(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchMyGiftsList = async (dispatch, serverUrl) => {
    try {
        const response = await fetch(`${serverUrl}/api/gift/get`)
        const data = await response.json()
        dispatch(setMyGiftList(data.info))
    } catch (error) {
        console.log(error);
    }
}