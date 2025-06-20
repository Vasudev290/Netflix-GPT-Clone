import { MOVIE_API_OPTIONS } from "../Utils/Constent/constent";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../Slices//movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  //Dispatch
  const dispatch = useDispatch();

  //useSelector
  const nowPlayingMovies = useSelector(
    (state) => state.movies.nowPlayingMovies
  );

  //fetch api from TMDB api
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      MOVIE_API_OPTIONS
    );
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const jsonData = await data.json();
    //console.log(jsonData.results);
    dispatch(addNowPlayingMovies(jsonData.results));
  };
  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
