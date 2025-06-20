import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import GptSearch from "./GPTSearchComponents/GptSearchPage";
import { useSelector } from "react-redux";
const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.showGptSearchView);

  //NowPlayingMoviesHook
  useNowPlayingMovies();

  //Popular Movies
  usePopularMovies();

  //TopRated Movies
  useTopRatedMovies();

  //upcomingMovies
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
