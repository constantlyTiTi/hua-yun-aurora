import React from "react";

const ActivityDetails = ({ title, dateTime, description, picsUrls, videoUrls }) => {



    return (
        <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="text-lg text-gray-900 dark:text-white">{dateTime}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>

            {picsUrls?.length > 0 && <>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Image</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        picsUrls.map((index, url) =>
                            <div key={`pic-${index}`}>
                                <img className="h-auto max-w-full rounded-lg" key={`image-${index}`} src={url} alt="activity picture" />
                            </div>)
                    }
                </div>
            </>
            }

            {videoUrls?.length > 0 &&
                <>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Video</h5>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {
                            videoUrls.map((index, url) =>
                                <video className="h-80" key={`video-${index}`} controls>
                                    <source src={url} key={`videoSource-${index}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )
                        }
                    </div>
                </>}

        </>
    )
}

export default ActivityDetails