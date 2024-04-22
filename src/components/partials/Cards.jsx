import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/noimage.jpg"

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full justify-center overflow-x-hidden mt-5 bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[25vh] mr-7 mb-6" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] gap-2 object-cover"
            src={ c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`: noimage}
            alt=""
          />
          <h1 className="text-xl text-zinc-300 font-semibold font-mono text-center mt-1 mb-2">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-[-8%] top-[1%] rounded-full bg-[#F2613F] w-[5.5vh] h-[5.5vh] flex items-center justify-center font-semibold text-zinc-200">
              {(c.vote_average * 10).toFixed()}
              <sup> % </sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
