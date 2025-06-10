import { useSelector } from "react-redux"
import VideoTitle from "./MainContainer/VideoTitle"
import VideoBackGround from "./MainContainer/VideoBackGround"
import { useState } from "react";


const MainContainer = () => {
    const [isMuted, setIsMuted] = useState(true);
    const movies = useSelector((state) => state?.movies?.nowPlayingMovies);

    const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

    if(movies === null) return;
    const mainMovie = movies[0]
    console.log(mainMovie);

    const {original_title, overview, id} = mainMovie;
  return (
    <div>
        <VideoTitle title={original_title} overview={overview} onToggleMute={handleToggleMute} isMuted={isMuted}/>
        <VideoBackGround movieId={id} isMuted={isMuted}/>
    </div>
  )
}

export default MainContainer