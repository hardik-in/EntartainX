import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  const videoUrl = ytvideo ? `https://www.youtube.com/watch?v=${ytvideo.key}` : null;

  return (
    <div className="bg-[rgba(0,0,0,0.9)] z-[100] top-0 left-0 absolute w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] text-5xl text-white right-5 top-5"
      >
        <i className="ri-close-line"></i>
      </Link>
      {ytvideo ? (
        <ReactPlayer
          url={videoUrl}
          controls
          width="80%"
          height="80%"
          style={{ position: "absolute" }}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
