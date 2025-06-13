import { MOVIE_IMG_CDN_URL } from "../../Utils/Constent/constent";

const GptMovieSuggestions = ({ poster_path, title }) => {
  const imgUrl = MOVIE_IMG_CDN_URL + poster_path;

  if (!poster_path) return null;

  return (
    <div className="w-40 md:w-52 lg:w-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-auto object-cover"
      />
      <div className="bg-black text-white text-xs md:text-sm text-center py-2">{title}</div>
    </div>
  );
};

export default GptMovieSuggestions;
