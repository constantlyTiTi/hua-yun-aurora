import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { getActivityPageSetting } from '@/app/api/getContentful'

import { itemClasses } from '@/app/const/css'

const ActivityDetails = ({ title, dateTime, description, picsUrls, videoUrls }) => {

    const [setting, setSetting] = useState()

    const [isScaleOpen, setIsScaleOpen] = useState(false)

    const [scaleImageUrl, setScaleImageUrl] = useState()



    useEffect(() => {
        getActivityPageSetting().then(res => {
            const jsonObj = JSON.parse(res)

            jsonObj.data.items.length > 0 && setSetting(jsonObj.data.items[0].fields)
        })
    }, [])

    const imageOnClick = (src) => {
        setScaleImageUrl(src)
        setIsScaleOpen(true)
    }

    const closeScaleImage = ()=>{
        setIsScaleOpen(false)
    }

    return (
        setting && <div className="text-left grid gap-3 p-3">
            <div className={`bg-black flex flex-col w-full h-svh overflow-auto z-50 top-0 left-0 fixed  ${isScaleOpen ? "block" : "hidden"}`}>
                <div className="flex justify-end p-2 group">
                    <svg onClick={closeScaleImage} className="rounded-lg h-8 w-8 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>

                </div>
                {/* <div className="h-5/6 bg-white w-5/6 m-auto"> */}
                    {scaleImageUrl && <img className="h-auto w-auto p-3 rounded-lg m-auto" src={scaleImageUrl} alt="activity picture" />}
                {/* </div> */}
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <Accordion id="activityDetails" variant="splitted" selectionMode="multiple" defaultExpandedKeys={["1", "2", "3", "4"]} itemClasses={itemClasses}>
                <AccordionItem key="1" aria-label={setting.activityDateHeader} title={setting.activityDateHeader}>
                    {dateTime.split("T")[0]}
                </AccordionItem>
                <AccordionItem key="2" aria-label={setting.activityDescriptionHeader} title={setting.activityDescriptionHeader}>
                    {description}

                </AccordionItem>

                {
                    picsUrls?.length > 0 && <AccordionItem key="3" aria-label={setting.imageHeader} title={setting.imageHeader}>
                        <div key="acc-3" className="grid w-full grid-cols-1 sm:grid-cols-3 gap-3">
                            {picsUrls.map((url, index) => <div onClick={()=>imageOnClick(url)} key={`pic-${index}`}> <img className="h-auto max-w-full rounded-lg" key={`image-${index}`} src={url} alt="activity picture" /></div>)}
                        </div>
                    </AccordionItem>

                }

                {
                    videoUrls?.length > 0 && <AccordionItem key="4" aria-label={setting.videoHeader} title={setting.videoHeader}>
                        <div key="acc-4" className="grid w-auto grid-cols-1 sm:grid-cols-3 gap-3">
                            {
                                videoUrls.map((url, index) =>

                                    <video key={`video-${index}`} Preload className="w-full h-full" controls>
                                        <source key={`source-${index}`} src={url} type="video/mp4" />
                                        <img src={url} title="Your browser does not support the <video> tag" />
                                    </video>
                                )
                            }
                        </div>
                    </AccordionItem>

                }

            </Accordion>

        </div>
    )
}

export default ActivityDetails