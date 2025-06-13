import { useSelector } from "react-redux";
import useMovieTrailers from "../../Hooks/useMovieTrailers";

const VideoBackGround = (props) => {
  const { movieId, isMuted } = props;
  const trailerVideo = useSelector((state) => state.movies?.trailerVideo);

  // Custom Hook for trailer fetch
  useMovieTrailers(movieId);

  const youtubeSrc = `https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${trailerVideo?.key}&controls=0&modestbranding=1&disablekb=1`;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 -z-10">
      <iframe
        className="w-full h-full object-cover"
        src={youtubeSrc}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
