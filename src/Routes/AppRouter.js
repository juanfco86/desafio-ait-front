import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Homepage";
import Profile from "../Pages/Profile";
import SearchPage from "../Pages/SearchPage";
import Trending from "../Pages/Trending";
import Random from "../Pages/Random";
import { PrivateRoutes } from "./PrivateRoutes";
import MyGifs from "../Pages/MyGifs";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:search" element={<SearchPage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/random" element={<Random />} />
        <Route path="/mygifs" element={<MyGifs />} />

        <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
      </Routes>
    </>
  );
};

export default AppRouter;
