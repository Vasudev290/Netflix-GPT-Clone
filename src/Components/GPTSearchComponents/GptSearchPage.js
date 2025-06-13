import { BACKGROUND_IMAGE_URL } from "../../Utils/Constent/constent";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearchPage = () => {
  return (
    <div className="w-full max-h-screen relative">
      <div className="absolute inset-0 z-[-2]">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-90"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
