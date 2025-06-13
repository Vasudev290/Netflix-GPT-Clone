import MovieList from "./SuggestMovies/MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);
  return (
    movies && (
      <div className="bg-black w-full h-full min-h-screen">
        <div className="-mt-52 pl-12 relative z-20">
          <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular Moives"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated Moives"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming Moives"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
