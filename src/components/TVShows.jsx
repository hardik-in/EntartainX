import React from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const TVShows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "TV " + category;
  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      Gettv();
    } else {
      setpage(1);
      settv([]);
      Gettv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full flex items-center justify-center px-12">
        <Link onClick={() => navigate(-1)}>
          <i className=" hover:text-[#6556CD] ri-arrow-left-line text-4xl mr-4 text-zinc-400"></i>
        </Link>
        <h1 className="text-3xl text-zinc-400 font-semibold"> TV </h1>
        <Topnav />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Category"
          option={["airing_today", "on_the_air", "popular", "top_rated"]}
          func={(o) => setcategory(o.target.value)}
        />
        <div className="w-[1%]"></div>
      </div>
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={tv.length}
        next={Gettv}
        hasMore={true}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TVShows;
