import React from "react";

const ActivityDetails = ({ title, dateTime, description, picsUrls, videoUrls }) => {

    return (
        <div className="text-left grid gap-3 p-3 w-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="text-lg text-gray-900 dark:text-white">{`${dateTime.split("T")[0]} ${dateTime.split("T")[1]}`}</p>
            <div className="px-3"> {description}</div>
           

            {picsUrls?.length > 0 && <>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Image</h5>
                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 justify-center">
                    {
                        picsUrls.map((url,index) =>
                            <div key={`pic-${index}`}>
                                {/* {url} */}
                                <img className="h-auto max-w-full rounded-lg" key={`image-${index}`} src={url} alt="activity picture" />
                            </div>)
                    }
                </div>
            </>
            }

            {videoUrls?.length > 0 &&
                <>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Video</h5>

                    <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 h-80">
                        {
                            videoUrls.map((url,index) =>
                                <iframe
                            key={`frame-${index}`} 
                            className='h-full w-full rounded-lg'
                            src={url} 
                            width="100%" 
                            title="video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen> 
                         </iframe>
                            )
                        }
                    </div>
                </>}

        </div>
    )
}

export default ActivityDetails