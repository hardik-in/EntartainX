import React from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movies " + category;

  const Getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      Getmovie();
    } else {
      setpage(1);
      setmovie([]);
      Getmovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full flex items-center justify-center px-12">
        <Link onClick={() => navigate(-1)}>
          <i className=" hover:text-[#6556CD] ri-arrow-left-line text-4xl mr-4 text-zinc-400"></i>
        </Link>
        <h1 className="text-3xl text-zinc-400 font-semibold"> MOVIES</h1>
        <Topnav />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Category"
          option={["now_playing", "popular", "top_rated", "upcoming"]}
          func={(o) => setcategory(o.target.value)}
        />
        <div className="w-[1%]"></div>
      </div>
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={movie.length}
        next={Getmovie}
        hasMore={true}
      >
        <Cards data={movie} title="Movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
