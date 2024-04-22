export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getsState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let theultimatedetails = {
      detail: details.data,
      externalid: externalid.data,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadmovie(theultimatedetails));
    console.log(theultimatedetails);
  } catch (error) {
    console.log("Error", error);
  }
};
