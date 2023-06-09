import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Carosel = () => {
  const slides = [
    {
      url: "https://cdn.shopify.com/s/files/1/0136/8467/0523/files/slider-1.jpg?v=1656490821",
      title: "Spring Sale",
      text: "Up to 20% off + free delivery",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0136/8467/0523/files/slider-2.jpg?v=1656490833",
      title: "Clearance Sale",
      text: "Up to 20% off + free delivery",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0136/8467/0523/files/slider-3_1296x.jpg?v=1656490844",
      title: "Bright new things",
      text: "Say hello to our branch new arrivals",
    },
  ];
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className="relative max-w-full h-[780px] w-full m-auto pt-16">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      >
        <div className="absolute top-[40%] left-20 text-left text-white transition-900">
          <h1 className="text-5xl mb-3">{slides[currentIndex].title}</h1>
          <p className="text-lg my-3">{slides[currentIndex].text}</p>
          <button
            className="px-6 py-2 bg-white text-black"
            onClick={() => navigate("/products")}
          >
            Shop now
          </button>
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 rounded-full text-2xl p-2 bg-black/20 text-white cursor-pointer">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 "
            onClick={prevSlide}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 rounded-full text-2xl p-2 bg-black/20 text-white cursor-pointer">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 "
            onClick={nextSlide}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Carosel;
