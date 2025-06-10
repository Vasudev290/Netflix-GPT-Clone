import { MOVIE_IMG_CDN_URL } from "../../Utils/Constent/constent"

const MovieCard = (props) => {
    const { poster_path } = props;
  return (
    <div className="w-48 pr-4 rounded-lg">
        <img src={MOVIE_IMG_CDN_URL + poster_path} alt="movieCard"/>
    </div>
  )
}

export default MovieCard