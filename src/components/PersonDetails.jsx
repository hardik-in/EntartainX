import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  return info ? (
    <div className="px-[4%] w-screen overflow-y-auto">
      <nav className="w-full mt-7 flex justify-between">
        <Link onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] ri-arrow-left-line text-5xl mr-1 text-white"></i>
        </Link>
      </nav>
      <div className="w-full flex mt-6 gap-10">
        <div className="w-[22%] ">
          <img
            className="w-full shadow-[8px_17px_38px_2px_rgba(0,0,0,0.9)] h-[55vh] gap-2 object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <hr className="mt-4" />
          <div className="mt-3 w-auto flex items-center justify-center gap-4 text-3xl text-zinc-400">
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
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              className="hover:text-[#6556CD]"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.instagram.com//${info.externalid.instagram_id}/`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              className="hover:text-[#6556CD]"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${info.externalid.twitter_id}/`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}/`}
            >
              <img
                className="w-[5vh] h-[5vh] rounded-lg"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEX1xRgAAAD+zBk3LQb/zxm7lhLWrBX5yRmCaA387s71xBCFaw33zVGlhRD////0vwCWeQ8jHAQuJQUnHwRURAhOPwjLoxQ7MAaKbw20kRKfgBD/0xpkUAoUEAJ9ZAxANAZcSgnhtRYbFgNsVwutixFCq2iVAAABLUlEQVRIie2X3W6DMAyF4xhIaUsLhH9W2Mbe/xnnhBUQC6xEu8y5sB2UT5EjHymwW3g9s4M6X8MbC++HOSLvITt+3ngms+KYLebk5PSCOEnoSEnwxVJX+pMwcQmi9HmGiOmJF5JyEggclRdCVCmmjYHkQPI9VAnbSCUIBDwV8BPF+A8QvGoBlipU3ksge1uAPKZwGUGPGt0Dg34BsmgGY5lUYgt8ANQPSEygVsc3wF5CB/BuAjPd+xaYZ/BJO01g4+2CnSojY498F1QbZX0c7AvVjW8BfqirszixVGUzg3rYXrmcsqVL9b8mMJ1HDoc9ENucmBkch4h3z/KyAidbZW2VSlbLla2ioRuCpsT417BOzlWe/fHt2sjCbGYnJ6d/kvVD1/ppbf2Yt/19+AZoxxDsQ2BxvQAAAABJRU5ErkJggg=="
                alt=""
              />
            </a>
          </div>
          <div className="text-zinc-400 font-mono mt-3">
            <h1 className="">Known For</h1>
            <h1 className="text-zinc-300 mb-2">
              {info.detail.known_for_department}
            </h1>
            <h1 className="text-zinc-400 font-mono">Gender</h1>
            <h1 className="text-zinc-300 font-mono mb-2">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>
            <h1 className="">Birthday</h1>
            <h1 className="text-zinc-300 mb-2">{info.detail.birthday}</h1>
            <h1 className="">Place of Birth</h1>
            <h1 className="text-zinc-300 mb-2">{info.detail.place_of_birth}</h1>
          </div>
        </div>
        <div className="text-white w-[80%]">
          <h1 className="text-7xl mb-6 font-bold">{info.detail.name}</h1>
          <p className="text-xl font-serif text-zinc-30 italic">
            {info.detail.biography}
          </p>
          <hr className="mt-4 mb-4" />
          <div className="mb-2">
            <p className="text-3xl mb-2 font-bold font-mono">Featured Works</p>
            <HorizontalCards data={info.combinedCredits.cast} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
