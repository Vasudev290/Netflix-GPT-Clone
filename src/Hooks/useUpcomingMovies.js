import { MOVIE_API_OPTIONS } from "../Utils/Constent/constent";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../Slices/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  //Dispatch
  const dispatch = useDispatch();

  //fetch api from TMDB api
  const getUpcomingdMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      MOVIE_API_OPTIONS
    );
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
    const jsonData = await data.json();
    console.log("upcoming movies",jsonData.results);
    dispatch(addUpcomingMovies(jsonData.results));
  };
  useEffect(() => {
    getUpcomingdMovies();
  }, []);
};

export default useUpcomingMovies;
