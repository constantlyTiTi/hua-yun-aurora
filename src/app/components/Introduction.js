import React from "react";

const Introduction = ({ introImageUrl,description }) => {

    return (
        <div className="h-dvh flex">
            <div className="flex w-64">

                <img className="h-auto max-w-full" src={`${introImageUrl}`} alt="image description" />

            </div>
            <div className="flex w-32">
                {description}
            </div>

        </div>
    )
}

export default Introduction