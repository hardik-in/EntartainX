import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setsearches] = useState([]);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[60%] h-[8vh] relative flex justify-center mt-4  items-center ml-[20%] bg-[#31363F] rounded-3xl mb-5">
      <i className="ri-search-line text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[80%] mx-4 p-5 text-xl outline-none border-none bg-transparent text-zinc-400"
        type="text"
        placeholder="  What are we watching ?"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-line text-3xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      <div className="z-[100] absolute mt-2 w-[80%] max-h-[50vh] top-[100%] bg-[#B6BBC4] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black duration-500 hover:bg-zinc-300 font-semibold text-zinc-700 w-[100%] p-3 flex justify-start border-b-2 border-zinc-100"
          >
            <img
              className="w-[11vh] h-[14vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
