import { MOVIE_API_OPTIONS } from "../Utils/Constent/constent";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../Slices/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  //Dispatch
  const dispatch = useDispatch();

  //useSelector
  const popularMovies = useSelector((state) => state.movies.popularMovies)
  //fetch api from TMDB api
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      MOVIE_API_OPTIONS
    );
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
    const jsonData = await data.json();
    //console.log(jsonData.results);
    dispatch(addPopularMovies(jsonData.results));
  };
  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
