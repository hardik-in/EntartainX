import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="ml-7 mr-7 h-[65vh] flex flex-col justify-end p-[4%] pb-[2%] "
    >
      <h1 className=" w-[80%] text-5xl font-black text-white mb-3">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[40%] text-white  text-justify ">
        {data.overview.slice(0, 250)}
        <Link
          to={`/${data.media_type || title}/details/${data.id}`}
          className=" text-blue-400"
        >
          {" "}
          ...More
        </Link>
      </p>
      <p className=" text-white flex gap-3 mt-3">
        <i className="ri-megaphone-fill text-yellow-300"></i>
        {data.release_date || "No Information"}
        <i className="ri-film-fill text-yellow-300"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`}>
        <p className=" bg-[#FB6D48] w-[13%] h-10 mt-3 p-2 rounded text-white text-center font-semibold font-mono">
          Watch Trailer
        </p>
      </Link>
    </div>
  );
};
export default Header;
