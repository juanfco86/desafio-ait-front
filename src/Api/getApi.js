import { setMyGifList } from "../redux/features/gif/gifNewSlice";
import { setGifRandom } from "../redux/features/gif/gifRandomSlice";
import { setGifListSearch } from "../redux/features/gif/gifSearchSlice";
import { setGifList } from "../redux/features/gif/gifSlice";

export const fetchGetUser = async (serverUrl, token, user) => {
  try {
    const response = await fetch(`${serverUrl}/api/user/check/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGifTrending = async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&limit=15&rating=g`
    );
    const data = await response.json();
    dispatch(setGifList(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchGifSearch = async (dispatch, search) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&q=${search}&limit=15&offset=0&rating=g&lang=en`
    );
    const data = await response.json();
    dispatch(setGifListSearch(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchGifRandom = async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=hUTYoE9O0GHWXkuXsL8ZiNd9eNVO8UU4&tag=&rating=g`
    );
    const data = await response.json();
    dispatch(setGifRandom(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyGifsList = async (dispatch, serverUrl) => {
  try {
    const response = await fetch(`${serverUrl}/api/gif/get`);
    const data = await response.json();
    dispatch(setMyGifList(data.info));
  } catch (error) {
    console.log(error);
  }
};
