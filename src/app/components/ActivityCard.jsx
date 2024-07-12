import React from "react";

const ActivityCard = ({ dateTime, title, picUrl, activityId }) => {

    console.log("picUrl", picUrl)

    return (
        <div key={`div-1-${activityId}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a key={`a-1-${activityId}`} href={`/activities/${activityId}`}>
            <picture key={`pic-1-${activityId}`} className="rounded-lg overflow-hidden block">
                <img key={`img-1-${activityId}`} className="rounded-t-lg hover:scale-125 ease-in duration-150" src={picUrl} alt="thumbnail" />
                </picture>
            </a>
            <div key={`div-2-${activityId}`} className="p-5">
            <h5 key={`h5-1-${activityId}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p key={`p-1-${activityId}`} className="text-lg text-gray-900 dark:text-white">{`${dateTime.split("T")[0]} ${dateTime.split("T")[1]}`}</p>
                <a key={`a-3-${activityId}`} href={`/activities/${activityId}`} className="inline-flex items-center mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg key={`svg-1-${activityId}`} className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path key={`path-1-${activityId}`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default ActivityCard