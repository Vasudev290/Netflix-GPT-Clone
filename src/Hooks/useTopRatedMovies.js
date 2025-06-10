import { MOVIE_API_OPTIONS } from "../Utils/Constent/constent";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Slices/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  //Dispatch
  const dispatch = useDispatch();

  //fetch api from TMDB api
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      MOVIE_API_OPTIONS
    );
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
    const jsonData = await data.json();
    //console.log(jsonData.results);
    dispatch(addTopRatedMovies(jsonData.results));
  };
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
