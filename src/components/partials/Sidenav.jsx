import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Trending from "../Trending";

const Sidenav = () => {
  return (
    <div className="w-[15%] h-full  border-r-2 border-zinc-400 p-8">
      <h1 className=" text-2xl text-white font-semibold flex gap-2 justify-center mb-10 mt-4">
        <i className=" text-[#6556CD] ri-tv-line"></i>
        <span>Entertainx.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <Link to="/Trending" className="hover:bg-[#FB6D48] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-fire-fill mr-2"></i> Trending
        </Link>
        <Link to="/Popular" className="hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-line-chart-fill mr-2"></i> Popular
        </Link>
        <Link to="/Movie" className="hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-movie-2-fill mr-2"></i>Movies
        </Link>
        <Link to="/TVShows" className="hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-tv-2-line mr-2"></i>TV
        </Link>
        <Link to="/Person" className="hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-group-3-fill mr-2"></i>People
        </Link>
      </nav>
      <hr className="border-none h-[2px] bg-zinc-400 mt-7 mb-7"></hr>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <Link className="hover:bg-[#86469C] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-information-line mr-2"></i> About
        </Link>
        <Link className="hover:bg-[#86469C] hover:text-white duration-400 rounded-lg p-3">
          <i className="ri-customer-service-fill mr-2"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
