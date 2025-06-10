import { useSelector } from "react-redux";
import useMovieTrailers from "../../Hooks/useMovieTrailers";
const VideoBackGround = (props) => {

   // props
  const { movieId, isMuted } = props;

  //useSelector
  const trailerVideo = useSelector((state) => state.movies?.trailerVideo);
  console.log(trailerVideo?.key)

  //Custom Hook for trailer fetch
  useMovieTrailers(movieId)

  const youtubeSrc = `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${trailerVideo.key}&controls=0&modestbranding=1&disablekb=1`;


  return (
    <div className="w-screen">
      <iframe
      className="w-screen aspect-video"
        src={youtubeSrc}
        // "https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} //inside we can pass trailerVideoId
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
