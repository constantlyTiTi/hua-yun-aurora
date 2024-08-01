'use client'
import React, { useEffect, useState } from "react";
import { getNews } from "../api/getContentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {itemClasses} from '@/app/const/css'

const Page = () => {

    const [news, setNews] = useState()

    useEffect(()=> {
        getNews().then(res=> {
            const newsdata =  JSON.parse(res).data?.items
            setNews(newsdata)
        })
    },[])

    return (
        news && <div className="lg:w-dv-40 md:w-dv-50 my-auto">


            <Accordion id="newsDetailCollapse" variant="splitted" selectionMode="multiple" defaultExpandedKeys={["news-0"]} itemClasses={itemClasses}>
                {
                    news?.map((f, index) => {

                        const richText = documentToReactComponents(f.fields.news)

                        return <AccordionItem key={`news-${index}`} aria-label={f.fields.shortTitle} title={f.fields.shortTitle}>
                            <div className="my-2">{f.fields.dateTime.split("T")[0]}</div>
                            <div>{richText}</div>                            
                            </AccordionItem>

                    })
                }

            </Accordion>
        </div>
    );

}

export default Page