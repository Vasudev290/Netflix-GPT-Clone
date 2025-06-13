import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../Utils/Constent/constent";
import { addTrailerVideo } from "../Slices/movieSlice";
import { useEffect } from "react";

const useMovieTrailers = (movieId) => {
  //Dispatch
  const dispatch = useDispatch();

  //useSelector
  const movieTrailerVideo = useSelector((state) => state.movies.trailerVideo)
  
  //fetch Trailer video
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      MOVIE_API_OPTIONS
    );
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
    const jsonData = await data.json();
    //console.log(jsonData.results);

    const filterDataVideo = jsonData.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    const trailerVideo = filterDataVideo.length
      ? filterDataVideo[0]
      : jsonData.results[0];
    //console.log(trailerVideo);
    dispatch(addTrailerVideo(trailerVideo));
  };
  useEffect(() => {
    !movieTrailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailers;
