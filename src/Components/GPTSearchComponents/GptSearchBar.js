import { useRef, useState } from "react";
import languageCoonstent from "../../Utils/Constent/languageConstent";
import { useSelector } from "react-redux";
import GptMovieSuggestions from "./GptMovieSuggestions";
import {
  BACKGROUND_IMAGE_URL,
  EXTRA_CDN_URL_LINK,
  MOVIE_API_OPTIONS,
  SERACH_MOVIES_CDN_URL,
} from "../../Utils/Constent/constent";

const GptSearchBar = () => {
  const languageKey = useSelector((state) => state.config.language);
  const searchTextRef = useRef(null);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGptSearch = async () => {
    const query = searchTextRef.current.value;
    setHasSearched(true);
    if (!query) {
      setSearchedMovies([]);
      return;
    }

    const searchMoviesLink = `${SERACH_MOVIES_CDN_URL}query=${query}&${EXTRA_CDN_URL_LINK}`;
    try {
      const response = await fetch(searchMoviesLink, MOVIE_API_OPTIONS);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", response.status, errorData);
        setSearchedMovies([]);
        return;
      }
      const data = await response.json();
      setSearchedMovies(data.results);
    } catch (error) {
      console.error("Network or Fetch Error:", error);
      setSearchedMovies([]);
    }
  };

  return (
    <div
      className="relative pt-[16%] md:pt-[13%] flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <form
        className="w-11/12 md:w-1/2 lg:w-1/3 bg-black bg-opacity-90 p-4 rounded-lg shadow-lg grid grid-cols-12 gap-2 z-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchTextRef}
          className="p-3 md:p-4 col-span-9 bg-black bg-opacity-90 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-sm md:text-base"
          placeholder={languageCoonstent[languageKey].gptSearchPlaceHolder}
        />
        <button
          onClick={handleGptSearch}
          className="py-2 px-4 col-span-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm md:text-base"
        >
          {languageCoonstent[languageKey].search}
        </button>
      </form>
      {/* Movie Results */}
      {hasSearched && searchedMovies.length > 0 && (
        <div className="mt-8 w-full bg-black py-6 px-4 md:px-6 z-10 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Search Results
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {searchedMovies.map((movie) =>
              movie && movie.id ? (
                <GptMovieSuggestions
                  key={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                />
              ) : null
            )}
          </div>
        </div>
      )}
      {hasSearched &&
        searchedMovies.length === 0 &&
        searchTextRef.current &&
        searchTextRef.current.value !== "" && (
          <p className="text-white mt-8 text-base md:text-lg z-10 text-center font-bold">
            No results found for "{searchTextRef.current.value}".
          </p>
        )}
    </div>
  );
};

export default GptSearchBar;
