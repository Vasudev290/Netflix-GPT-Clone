import { BACKGROUND_IMAGE_URL } from "../../Utils/Constent/constent";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearchPage = () => {
  return (
    <div className="w-full max-h-screen">
      <div className="absolute inset-0 z-[-1]">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage; 