import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  console.log(movies);
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    console.log(`No valid movies array to display for title: ${title}`);
    return (
      <div className="px-6 py-6 bg-black">
        <h1 className="text-3xl font-bold py-4 text-white">{title}</h1>
        <p className="text-gray-400">No movies available at the moment.</p>
      </div>
    );
  }
  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>

      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
