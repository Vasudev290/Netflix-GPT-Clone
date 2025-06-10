import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer"
import usePopularMovies from "../Hooks/usePopularMovies";
const Browse = () => {

  //NowPlayingMoviesHook
  useNowPlayingMovies();

  //Popular Movies
  usePopularMovies()
  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  );
};

export default Browse;
