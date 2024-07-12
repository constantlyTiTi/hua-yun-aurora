'use client'
import React, { useEffect, useState } from "react";
import { getNews } from "../api/getContentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const Page = () => {

    const [news, setNews] = useState()

    useEffect(()=> {
        getNews().then(res=> {
            const newsdata =  JSON.parse(res).data?.items
            setNews(newsdata)
        })
    },[])

    return (
        news && <div className="lg:w-dv-40 md:w-dv-50 text-center my-auto">


            <Accordion id="newsDetailCollapse" selectionMode="multiple" defaultExpandedKeys={["news-0"]}>
                {
                    news?.map((f, index) => {

                        const richText = documentToReactComponents(f.fields.news)

                        return <AccordionItem key={`news-${index}`} aria-label={f.fields.shortTitle} title={f.fields.shortTitle}>
                            <h2>{f.fields.shortTitle}</h2>
                            <div>{f.fields.dateTime}</div>
                            <div>{richText}</div>
                            
                            </AccordionItem>

                        // const richText = documentToReactComponents(f.fields.news)

                        // return <AccordionItem key={`news-${index}`} aria-label={f.fields.shortTitle} title={f.fields.shortTitle}>
                        //     {richText}
                        // </AccordionItem>

                    })
                }

            </Accordion>
        </div>
    );

}

export default Page