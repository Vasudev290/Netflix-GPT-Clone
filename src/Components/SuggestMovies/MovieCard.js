import { MOVIE_IMG_CDN_URL } from "../../Utils/Constent/constent";

const MovieCard = (props) => {
  const { poster_path } = props;

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
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
      </div>
    </div>
  );
};

export default MovieCard;
