import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Slices/userSlice";
import { useEffect } from "react";

const Header = () => {
  //Selector Method
  const user = useSelector((state) => state.user);

  //Navigate
  const navigate = useNavigate();

  //Dispatch
  const dispatch = useDispatch();

  //SignOut Button
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/errorPage");
      });
  };

  //useEffect
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
          navigate("/browse")
        } else {
          dispatch(removeUser());
          navigate("/")
          
        }
      });
    }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
        className="w-44 md:w-48"
      />
      {user && (
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-12 rounded"
            src={user?.photoURL || "https://avatars.githubusercontent.com/u/160304551?v=4"}
            alt="user-icon"
          />
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
