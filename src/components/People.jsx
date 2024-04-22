import React from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "People ";
  const Getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      Getpeople();
    } else {
      setpage(1);
      setpeople([]);
      Getpeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full flex items-center justify-center px-12">
        <Link onClick={() => navigate(-1)}>
          <i className=" hover:text-[#6556CD] ri-arrow-left-line text-4xl mr-4 text-zinc-400"></i>
        </Link>
        <h1 className="text-3xl text-zinc-400 font-semibold"> PEOPLE </h1>
        <Topnav />
        <div className="w-[2%]"></div>
        <div className="w-[1%]"></div>
      </div>
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={people.length}
        next={Getpeople}
        hasMore={true}
      >
        <Cards data={people} title="Person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
