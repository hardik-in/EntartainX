export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getsState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theultimatedetails = {
      detail: details.data,
      externalid: externalid.data,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadtv(theultimatedetails));
    console.log(theultimatedetails);
  } catch (error) {
    console.log("Error", error);
  }
};
