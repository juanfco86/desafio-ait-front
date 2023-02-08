import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGiftSearch } from "../Api/getApi";

const SearchPage = () => {
    const dispatch = useDispatch()
    const giftData = useSelector(state => state.giftSlice)
    const [search, setSearch] = useState()
    
    // RECOGE LOS DATOS DEL SEARCH
    console.log(search);
    console.log(giftData);

useEffect(() => {
    fetchGiftSearch(dispatch, search)
}, [dispatch]);

return (
        <>
            <h1>Results</h1>
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

export default SearchPage