'use client'
import React, { useState, useEffect } from "react";
import { getLevel2Teams } from "@/app/api/getContentful";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useRouter } from 'next/navigation'
import { itemClasses } from '@/app/const/css'

const ParentTeam = ({ team, header }) => {

    const [subTeams, setSubTeams] = useState()

    const router = useRouter()

    useEffect(() => {

        getLevel2Teams(team.teamNameShort).then(res => {

            const subTeamsData = JSON.parse(res)
            subTeamsData?.data?.items && setSubTeams(subTeamsData?.data?.items)

        })


    }, [team])

    const clickImage = (subTeamName)=>{
        router.push(`/teams/${team.teamNameShort}/${subTeamName}`)
    }

    return (
        <>

        <Accordion id="teamDetailCollapse" variant="splitted" selectionMode="multiple" defaultExpandedKeys={["1", "2"]} itemClasses={itemClasses}>
            <AccordionItem key="1" aria-label={header.teamName} title={header.teamName}>
                {team.teamNameFull}
            </AccordionItem>
            {team.teamLeaders?.length > 0 && <AccordionItem key="2" aria-label={header.teamLeadersName} title={header.teamLeadersName}>
                <div key="acc-2" className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
                    {team.teamLeaders.map(name => <div key={`leader-${name}`}>{name}</div>)}
                </div>

            </AccordionItem>}

        </Accordion>
        <div key="acc-2" className="grid w-full grid-cols-1 sm:grid-cols-3 my-5 h-full">
                {subTeams?.map(st => (<div key={`sub-div-${st.fields.teamNameShort}`} className="text-center mt-5" onClick={()=>clickImage(st.fields.teamNameShort)}>
                    <img
                    key={`sub-img-${st.fields.teamNameShort}`}
                        src={st.fields.teamThumbnailImageUrl}
                        class=" h-64 w-64 mx-auto rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                        alt={`${st.fields.teamNameFull} thumbnail image`} />
                    <h3 key={`sub-h3-${st.fields.teamNameShort}`} className="my-2 text-2xl">{st.fields.teamNameFull}</h3>
                </div>))}
    
            </div>
        
</>
    )
}

export default ParentTeam