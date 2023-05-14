import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="h-full w-screen py-5">
      <div className="flex items-center justify-center px-6 lg:px-0 flex-col rhJ7qSuv_H6qJxmzGcAa dMAuL1oBmema6sjWH3ZQ h8KYXnua2NT4kTVzieom">
        <div className="h-auto sm:max-w-sm">
          <img
            src="https://flowbite.com/application-ui/demo/images/illustrations/404.svg"
            alt="astronaut image"
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold lg:text-5xl md:text-4xl text-white mb-3 _W6lL4Tl4FRQaFVvDlM2 ydrQDf1Vp0dvugV0vX85 OyABRrnTV_kvHV7dJ0uE">
            Page not found
          </h1>
          <p className="text-gray-500 text-base md:text-lg PeR2JZ9BZHYIH8Ea3F36 uZA22oIO_SmhF60EZ9rn XIIs8ZOri3wm8Wnj9N_y">
            Oops! Looks like you followed a bad link. If you think this is a
            problem with us, please tell us.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="py-2.5 px-5 rounded-lg inline-flex mr-3 text-sm font-medium items-center decoration-inherit bg-blue-600 text-white justify-center mt-2 d8_fVOcgDmbt7UdpfeLK WuKugQzwTT7o1wwBck2R _ZsTMX_gz275093orLWM"
          >
            <svg
              className="h-5 w-5 -ml-1 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p>Go back home</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
