import React from "react";
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Introduction = ({ introduction }) => {

    const richText = documentToReactComponents(introduction.groupDescription)

    return (
        <div className="grid md:grid-cols-2 w-full gap-4 content-start">
            <div className="lg:w-dv-60 md:w-dv-50 px-2">
                {
                    introduction?.introductionImageUrl && <img className="h-auto max-w-full rounded-lg" src={introduction.introductionImageUrl} alt="group desciption picture" />
                }
            </div>
            <div className="lg:w-dv-40 md:w-dv-50 text-center my-auto px-5">
                {richText}
                <Link type="button"
                href='/teams'
                    className="inline-block w-20 text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Details</Link>
            </div>

        </div>
    )
}

export default Introduction