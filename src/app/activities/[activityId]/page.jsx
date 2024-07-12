'use client'
import React,{useState, useEffect} from "react";
import { usePathname } from "next/navigation";
import { getActivitieById } from "@/app/api/getContentful";
import ActivityDetails from "@/app/components/ActivityDetails";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Page = ()=> {

    const pathName = usePathname()
    const activityId = pathName.split("/activities/")[1]

    const [richText, setRichText] = useState()

    const [activity, setActivity] = useState()

    useEffect(()=> {

        activityId && getActivitieById(activityId).then(res=>{

            const response = JSON.parse(res).data.fields
            setRichText(documentToReactComponents(response.description))

            setActivity(response)
            
        })
        .catch(error=> console.log(error))

    },[activityId])

    return (activity &&
    
    <ActivityDetails title={activity.name} dateTime={activity.dateTime} description={richText} 
        picsUrls={activity.picturesUrls} videoUrls={activity.videosUrls}/>
    )
}

export default Page