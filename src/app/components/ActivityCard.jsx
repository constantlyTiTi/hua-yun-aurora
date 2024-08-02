import React from "react";
import Link from "next/link";

const ActivityCard = ({ dateTime, title, picUrl, activityId }) => {
  return (
    <div
      key={`div-1-${activityId}`}
      className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <Link key={`a-1-${activityId}`} href={`/activities/${activityId}`}>
        <picture
          key={`pic-1-${activityId}`}
          className="block overflow-hidden rounded-lg"
        >
          <img
            key={`img-1-${activityId}`}
            className="rounded-t-lg duration-150 ease-in hover:scale-125"
            src={picUrl}
            alt="thumbnail"
          />
        </picture>
      </Link>
      <div key={`div-2-${activityId}`} className="p-5">
        <h5
          key={`h5-1-${activityId}`}
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {title}
        </h5>
        <p
          key={`p-1-${activityId}`}
          className="text-lg text-gray-900 dark:text-white"
        >
          {dateTime.split("T")[0]}
        </p>
        <Link
          key={`a-3-${activityId}`}
          href={`/activities/${activityId}`}
          className="mt-3 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            key={`svg-1-${activityId}`}
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              key={`path-1-${activityId}`}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
