import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/noimage.jpg"


const HorizontalCards = ({ data }) => {
  return (
    <div>
      <div className="w-full h-[47vh] flex px-7 py-2 gap-3 overflow-x-auto overflow-y-hidden">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="relative  min-w-[15%]">
            <img
              className="object-cover w-full h-full rounded"
              src={d.poster_path || d.backdrop_path ?`https://image.tmdb.org/t/p/original/${
                d.poster_path || d.backdrop_path
              }`: noimage}
              alt=""
            />
            <div>
              <div className="flex flex-col absolute  inset-0 bg-black opacity-0 items-center transition-opacity duration-500 py-2 px-2 rounded">
                <div className="text-center text-white text-xl font-bold mb-2">
                  <h1 className="font-mono">
                    {d.title || d.name || d.original_name || d.original | title}
                  </h1>
                </div>
                <span className="text-white text-center text-base font-serif">
                  {d.overview.slice(0, 105)}{" "}
                  <span className=" text-blue-500"> ...More</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-5"></div>
    </div>
  );
};
export default HorizontalCards;
