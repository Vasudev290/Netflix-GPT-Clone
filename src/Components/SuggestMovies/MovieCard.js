import { MOVIE_IMG_CDN_URL } from "../../Utils/Constent/constent";

const MovieCard = (props) => {
  const { poster_path, isNewSeason, isRecentlyAdded, isTop10 } = props;

  const fallbackImageUrl =
    "https://placehold.co/200x300/1a202c/e2e8f0?text=No+Poster";

  const imageUrl = poster_path
    ? `${MOVIE_IMG_CDN_URL}${poster_path}`
    : fallbackImageUrl;

  return (
    <div className="relative w-36 md:w-48 flex-shrink-0 rounded-lg shadow-xl overflow-hidden group">
      <img
        className="w-full h-auto object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
        alt="Movie Poster"
        src={imageUrl}
        onError={(e) => { e.target.onerror = null; e.target.src = fallbackImageUrl; }}
      />

      {isTop10 && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-[35px] min-h-[35px] text-center">
            {/* Using a simple number for Top 10, or could use an SVG icon for more complex design */}
            <span className="text-sm">10</span>
        </div>
      )}

      {isNewSeason && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-2 text-center text-white text-xs md:text-sm font-semibold">
          New Season
        </div>
      )}

      {isRecentlyAdded && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-2 text-center text-white text-xs md:text-sm font-semibold">
          Recently Added
        </div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
      </div>
    </div>
  );
};

export default MovieCard;
