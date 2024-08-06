import React from "react";
const ImageGallery = ({
  isScaleOpen,
  imgIndex,
  setImageIndex,
  images,
  closeScaleImage,
}) => {
  const prevImage = () => {
    if (imgIndex === 0) return;
    const cI = imgIndex;
    setImageIndex(cI - 1);
  };

  const nextImage = () => {
    if (imgIndex === images.length - 1) return;
    const cI = imgIndex;
    setImageIndex(cI + 1);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-svh w-full flex-col overflow-auto bg-black ${isScaleOpen ? "block" : "hidden"}`}
    >
      <div className="group flex justify-end p-2">
        <svg
          onClick={closeScaleImage}
          className="h-8 w-8 rounded-lg text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <div className="flex-1">
        <div id="default-carousel" className="relative h-full w-full">
          <div className="flex-cols-1 relative flex h-full overflow-hidden">
            {images?.map((url, index) => (
              <div
                key={`imageDiv-${index}`}
                className={`abosolute flex h-full w-full ${imgIndex === index ? "" : "hidden"}`}
                data-carousel-item
              >
                <img
                  key={`imageImg-${index}`}
                  src={url}
                  className="m-auto h-auto w-full"
                  alt="photo"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevImage}
            type="button"
            className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <svg
                className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  cstrokeLinecap="round"
                  strokeLinejoin="round"
                  strstrokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            onClick={nextImage}
            type="button"
            className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <svg
                className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  cstrokeLinecap="round"
                  strokeLinejoin="round"
                  strstrokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
