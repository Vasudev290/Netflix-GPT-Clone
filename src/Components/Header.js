import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Slices/userSlice";
import { useEffect, useState } from "react";
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

  // Track mobile menu open state
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handler for the Sign Out button
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Sign Out Error:", error);
        navigate("/errorPage");
      });
  };

  // useEffect for auth state change
  useEffect(() => {
    const unSubscribeFun = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
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

  // Toggle GPT Search
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  // Language change handler
  const handleLanguageChange = (e) => {
    dispatch(chnageLanguage(e.target.value));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-b from-black fixed top-0 w-full z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={LOGO_URL}
              alt="Netflix Logo"
              className="w-28 sm:w-36 md:w-44 lg:w-48"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/184x48?text=Netflix+Logo";
              }}
            />
          </div>

          {/* Desktop Nav (hidden on mobile) */}
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              {/* Language Selector */}
              {showGptSearchView && (
                <select
                  onChange={handleLanguageChange}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Select Language"
                  defaultValue={SUPPORT_LANGUAGES[0]?.identifier}
                >
                  {SUPPORT_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              {/* GPT Search Toggle */}
              <button
                onClick={handleGptSearch}
                className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-pressed={showGptSearchView}
                aria-label="Toggle GPT Search"
              >
                <span className="material-icons text-lg">
                  {showGptSearchView ? "Home" : "GPT Search"}
                </span>
              </button>

              {/* User Avatar */}
              <img
                className="w-10 h-12 rounded-lg object-cover"
                src={user.photoURL || AVATAR_IMAGE_URL}
                alt="User Avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/40x48?text=Avatar";
                }}
              />

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
                className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400"
              >
                <span className="material-icons text-4xl">
                  {isMobileMenuOpen ? (
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="4"
                        y1="4"
                        x2="20"
                        y2="20"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <line
                        x1="20"
                        y1="4"
                        x2="4"
                        y2="20"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="3" fill="#FFFFFF" />
                      <rect y="10" width="24" height="3" fill="#FFFFFF" />
                      <rect y="20" width="24" height="3" fill="#FFFFFF" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && user && (
        <nav
          className="md:hidden bg-black bg-opacity-90 px-6 py-4 space-y-4"
          aria-label="Mobile navigation menu"
        >
          {showGptSearchView && (
            <select
              onChange={handleLanguageChange}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Select Language"
              defaultValue={SUPPORT_LANGUAGES[0]?.identifier}
            >
              {SUPPORT_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => {
              handleGptSearch();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white font-semibold px-5 py-3 rounded-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-pressed={showGptSearchView}
          >
            <span className="material-icons text-lg">
              {showGptSearchView ? "Home" : "GPT Search"}
            </span>
          </button>

          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
