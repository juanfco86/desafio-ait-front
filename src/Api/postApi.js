import { setAddGif } from "../redux/features/gif/gifNewSlice";

export const fetchAddGif = async (
  serverURL,
  newgif,
  getAccessTokenSilently,
  dispatch
) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${serverURL}/api/gif/new`, {
      method: "POST",
      body: JSON.stringify(newgif),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setAddGif(data.info));
  } catch (error) {
    console.log(error);
  }
};
