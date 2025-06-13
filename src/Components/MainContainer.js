import { useSelector } from "react-redux";
import VideoTitle from "./MainContainer/VideoTitle";
import VideoBackGround from "./MainContainer/VideoBackGround";
import { useState } from "react";

const MainContainer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const movies = useSelector((state) => state?.movies?.nowPlayingMovies);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (movies === null || movies.length === 0) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading main movie content...
      </div>
    );
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="w-full h-screen relative">
      <VideoTitle
        title={original_title}
        overview={overview}
        onToggleMute={handleToggleMute}
        isMuted={isMuted}
      />
      <VideoBackGround movieId={id} isMuted={isMuted} />
    </div>
  );
};

export default MainContainer;
