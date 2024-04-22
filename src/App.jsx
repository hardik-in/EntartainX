import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TVShows from "./components/TVShows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TVDetails from "./components/TVDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/partials/Trailer";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Movie" element={<Movie />} />
        <Route path="/Movie/details/:id" element={<MovieDetails />}>
          <Route path="/Movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/TVShows" element={<TVShows />} />
        <Route path="/TV/details/:id" element={<TVDetails />}>
          <Route path="/TV/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/Person" element={<People />} />
        <Route path="/Person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
