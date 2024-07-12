import React from "react";
import { getIntroduction } from "../api/useContentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Page = async ({team}) =>{
    const intro = await getIntroduction()

    const settings = intro?.data?.items[0]?.fields

    const richText = documentToReactComponents(settings.groupDescription)
  
    return (
        <div className="lg:w-dv-40 md:w-dv-50 text-center my-auto">
                {richText}
                </div>
    );

}

export default Page