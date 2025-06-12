import MovieCard from "./MovieCard";
import { useRef } from "react";
const MovieList = (props) => {
  const { title, movies } = props;
  //console.log(movies);

  const scrollContainerRef = useRef(null);
  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    //console.log(`No valid movies array to display for title: ${title}`);
    return (
      <div className="px-6 py-6 bg-black">
        <h1 className="text-3xl font-bold py-4 text-white">{title}</h1>
        <p className="text-gray-400">No movies available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="px-6 bg-black mb-8 relative w-full max-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold py-4 text-white">
        {title}
      </h1>

      <div className="flex items-center">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft} 
          className="absolute left-0 z-10 p-2 text-white rounded-r-lg h-full flex items-center justify-center transition-all duration-200 focus:outline-none"
          aria-label={`Scroll left in ${title}`}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        {/* Movie Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 pb-2 overflow-x-hidden w-full"
        >
          {movies.map((movie) =>
            movie && movie.id ? (
              <MovieCard
                key={movie.id}
                poster_path={movie.poster_path}
              />
            ) : null
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 text-white rounded-l-lg h-full flex items-center justify-center transition-all duration-200 focus:outline-none"
          aria-label={`Scroll right in ${title}`}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
