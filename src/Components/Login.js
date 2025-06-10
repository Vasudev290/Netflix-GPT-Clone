import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../Utils/Logic/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlice";
import { BACKGROUND_IMAGE_URL, AVATAR_IMAGE_URL } from "../Utils/Constent/constent";

const Login = () => {
  // Local State Variable
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reference Variables for input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Dispatch hook from Redux
  const dispatch = useDispatch();

  // Function to toggle between Sign In and Sign Up forms
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear error message when toggling form
  };

  // Handler for the form submission button (Sign In/Sign Up)
  const handleButtonClick = () => {
    // Validate the form data using the utility function
    const message = checkValidateData(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrorMessage(message); 
    if (message) return; 

    // Authentication logic based on whether it's a Sign Up or Sign In form
    if (!isSignInForm) {
      // Sign Up Logic: Create user with email and password
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // Update user profile with display name and photo URL
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: AVATAR_IMAGE_URL, // Using a constant for avatar URL
          })
            .then(() => {
              // Get current user details from Firebase Auth
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // Dispatch action to add user to Redux store
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // Handle profile update errors
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          // Handle Sign Up errors (e.g., email already in use)
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic: Sign in user with email and password
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user); 
        })
        .catch((error) => {
          // Handle Sign In errors (e.g., wrong password, user not found)
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0 z-[-1]">
        <img
          src={BACKGROUND_IMAGE_URL} 
          alt="background"
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login/Sign Up Form */}
      <form
        onSubmit={(e) => e.preventDefault()} 
        className="w-full md:w-8/12 lg:w-5/12 xl:w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700" // Added rounded, focus, and border
          />
        )}

        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700" // Added rounded, focus, and border
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700" // Added rounded, focus, and border
        />

        <p className="text-red-500 font-bold p-2">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-md text-xl font-semibold hover:bg-red-800 transition-colors duration-200" // Styled button with hover
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer text-gray-400 hover:underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
