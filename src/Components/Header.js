import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Slices/userSlice";
import { useEffect } from "react";
import {
  AVATAR_IMAGE_URL,
  LOGO_URL,
  SUPPORT_LANGUAGES,
} from "../Utils/Constent/constent";
import { toggleGptSearchView } from "../Slices/gptSlice";
import { chnageLanguage } from "../Slices/configSlice";

const Header = () => {
  const user = useSelector((state) => state.user);

  const showGptSearchView = useSelector((state) => state.gpt.showGptSearchView);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handler for the Sign Out button
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Sign Out Error:", error);
        navigate("/errorPage");
      });
  };

  // useEffect
  useEffect(() => {
    const unSubscribeFun = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unSubscribeFun();
  }, [dispatch, navigate]);

  //Toggle Gpt Search
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  //Language Change
  const handleLanguageChange = (e) => {
    dispatch(chnageLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-1 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img src={LOGO_URL} alt="Netflix Logo" className="w-44 md:w-48" />

      {user && (
        <div className="flex items-center space-x-4">
          {showGptSearchView && (
            <select
              onChange={handleLanguageChange}
              className="p-2 m-2 bg-gray-700 text-white rounded-lg font-semibold"
            >
              {SUPPORT_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="py-4 px-2 mx-2 my-2 bg-purple-400 font-semibold text-white rounded-md hover:bg-purple-500 transition-colors duration-200"
          >
            {showGptSearchView ? "Home" : " GPT Search"}
          </button>
          {/* User Avatar */}
          <img
            className="w-10 h-12 rounded"
            src={user?.photoURL || AVATAR_IMAGE_URL}
            alt="User Avatar"
          />
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
