import React from 'react';

const VideoTitle = (props) => {
  const { title, overview ,onToggleMute, isMuted  } = props;

  return (
    <div className="absolute pt-[15%] px-24 text-white bg-gradient-to-r from-black w-full aspect-video">
      <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
        {title}
      </h1>
      <p className="hidden md:block py-6 text-lg w-1/2 lg:w-1/3 leading-relaxed">
        {overview}
      </p>
      <div className="flex space-x-3 mt-4 md:mt-0">
        <button className="flex items-center bg-white text-black py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-opacity-80 transition-colors duration-200 text-lg font-semibold">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            ></path>
          </svg>
          Play
        </button>
        <button className="hidden md:flex items-center bg-white text-black bg-opacity-70 py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-opacity-60 transition-colors duration-200 text-lg font-semibold">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 000-2H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          More Info
        </button>
        <button
          onClick={onToggleMute} // Calls the function passed from MainContainer to toggle mute state
          className="flex items-center bg-gray-500 text-white bg-opacity-70 py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-opacity-60 transition-colors duration-200 text-lg font-semibold"
        >
          {/* Dynamically display mute or unmute icon based on `isMuted` prop */}
          {isMuted ? (
            // Muted icon (volume off)
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.383 5.06A2 2 0 0110 4v12a2 2 0 01-3.383 1.56L4 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1l2.617-2.94zM12 9a1 1 0 010-2h4a1 1 0 110 2h-4zm0 4a1 1 0 010-2h4a1 1 0 110 2h-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            // Unmuted icon (volume on)
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.383 5.06A2 2 0 0110 4v12a2 2 0 01-3.383 1.56L4 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1l2.617-2.94zM13.293 8.707a1 1 0 011.414-1.414L16 9.586l1.293-1.293a1 1 0 011.414 1.414l-1.293 1.293 1.293 1.293a1 1 0 01-1.414 1.414L16 12.414l-1.293 1.293a1 1 0 01-1.414-1.414l1.293-1.293-1.293-1.293z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
