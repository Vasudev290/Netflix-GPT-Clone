import React from "react";
import languageCoonstent from "../../Utils/Constent/languageConstent";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
    const languageKey = useSelector((state) => state.config.language)
  return (
    <div className="pt-[8%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-2 col-span-10"
          placeholder={languageCoonstent[languageKey].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 m-2 col-span-2 bg-red-600 text-white font-semibold rounded-lg">
          {languageCoonstent[languageKey].search }
        </button>
      </form>
    </div>
  ); 
};

export default GptSearchBar;
