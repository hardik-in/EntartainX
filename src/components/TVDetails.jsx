import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TVDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.8), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[5%] text-white overflow-x-hidden"
    >
      <nav className="w-full mt-7 flex justify-between">
        <Link onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] ri-arrow-left-line text-5xl mr-1 text-white"></i>
        </Link>
        <div className="w-auto flex items-center justify-between gap-10 text-2xl">
          <a
            className="hover:text-[#6556CD]"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-global-line"></i>
          </a>
          <a
            className="hover:text-[#6556CD]"
            target="_blank"
            rel="noopener noreferrer"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            <img
              className="w-[7vh] h-full rounded-lg"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEX1xRgAAAD+zBk3LQb/zxm7lhLWrBX5yRmCaA387s71xBCFaw33zVGlhRD////0vwCWeQ8jHAQuJQUnHwRURAhOPwjLoxQ7MAaKbw20kRKfgBD/0xpkUAoUEAJ9ZAxANAZcSgnhtRYbFgNsVwutixFCq2iVAAABLUlEQVRIie2X3W6DMAyF4xhIaUsLhH9W2Mbe/xnnhBUQC6xEu8y5sB2UT5EjHymwW3g9s4M6X8MbC++HOSLvITt+3ngms+KYLebk5PSCOEnoSEnwxVJX+pMwcQmi9HmGiOmJF5JyEggclRdCVCmmjYHkQPI9VAnbSCUIBDwV8BPF+A8QvGoBlipU3ksge1uAPKZwGUGPGt0Dg34BsmgGY5lUYgt8ANQPSEygVsc3wF5CB/BuAjPd+xaYZ/BJO01g4+2CnSojY498F1QbZX0c7AvVjW8BfqirszixVGUzg3rYXrmcsqVL9b8mMJ1HDoc9ENucmBkch4h3z/KyAidbZW2VSlbLla2ioRuCpsT417BOzlWe/fHt2sjCbGYnJ6d/kvVD1/ppbf2Yt/19+AZoxxDsQ2BxvQAAAABJRU5ErkJggg=="
              alt=""
            />
          </a>
        </div>
      </nav>
      <div className="font-mono w-full mt-7 flex justify-between">
        <div className="w-[17%]">
          <img
            className="w-full shadow-[8px_17px_38px_2px_rgba(0,0,0,0.9)] h-[50vh] gap-2 object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <div className="mt-2 text-2xl font-semibold">
            Watch Now on -
            <div className="flex w-auto gap-2 mt-2">
              {info.watchproviders &&
                info.watchproviders.flatrate &&
                info.watchproviders.flatrate.map((w) => (
                  <img
                    key={w.provider_id} // Unique key for each provider
                    title={w.provider_name}
                    className="rounded-md h-[6vh] object-cover"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt=""
                  />
                ))}
            </div>
            <div className="flex w-auto gap-2 mt-2">
              {info.watchproviders &&
                info.watchproviders.rent &&
                info.watchproviders.rent.map((w) => (
                  <img
                    key={w.provider_id} // Unique key for each provider
                    title={w.provider_name}
                    className="rounded-md h-[6vh] object-cover"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt=""
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="content w-[75%] font-sans">
          <div className="flex gap-4">
            <h1 className="text-6xl font-mono font-semibold">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}
            </h1>
            <small className="text-3xl font-mono">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </div>
          <div className="flex items-baseline text-2xl gap-5 font-mono font-semibold">
            {info.detail.vote_average && (
              <div className="text-xl mt-4 rounded-full bg-[#DD5746] w-[6.5vh] h-[6.5vh] flex items-center justify-center font-semibold text-zinc-200">
                {(info.detail.vote_average * 10).toFixed()}
                <sup> % </sup>
              </div>
            )}
            <h1>[{info.detail.genres.map((g) => g.name).join(", ")}]</h1>
            <h1>[{info.detail.first_air_date}]</h1>
            <h1>[{info.detail.runtime} min.]</h1>
          </div>
          <h1 className="italic mt-2 text-2xl font-semibold">
            "{info.detail.tagline}"
          </h1>
          <h1 className="text-4xl font-bold mt-3 mb-2 font-mono">Overview</h1>
          <p className="font-serif text-xl text-white mb-6 italic">
            {info.detail.overview}
          </p>
          <Link
            className="bg-[#5755FE] w-auto p-3 font-bold font-mono"
            to={`${pathname}/trailer`}
          >
            Play Trailer
          </Link>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="mt-5">
        <p className="text-4xl font-bold mb-4 font-mono ml-8">Seasons - </p>
        <div className="flex overflow-x-auto">
          {info.detail.seasons.map((s, i) => (
            <>
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] mr-3 gap-2 object-cover mb-3"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />
            </>
          ))}
        </div>
        <hr className="mt-4" />
        <p className="text-4xl font-bold mt-4 mb-4 font-mono ml-8">
          Recommended -
        </p>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TVDetails;
