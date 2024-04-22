import React from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Trending " + category;

  const Gettrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      Gettrending();
    } else {
      setpage(1);
      settrending([]);
      Gettrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-center px-8">
        <Link onClick={() => navigate(-1)}>
          <i className=" hover:text-[#6556CD] ri-arrow-left-line text-5xl mr-2 text-zinc-400"></i>
        </Link>
        <h1 className="text-3xl text-zinc-400 font-semibold"> TRENDING</h1>
        <Topnav />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Category"
          option={["movie", "tv", "all"]}
          func={(o) => setcategory(o.target.value)}
        />
        <div className="w-[1%]"></div>
        <Dropdown
          title="Duration"
          option={["week", "day", "all"]}
          func={(o) => setduration(o.target.value)}
        />
      </div>
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={trending.length}
        next={Gettrending}
        hasMore={true}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
