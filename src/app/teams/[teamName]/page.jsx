'use client'
import React, { useContext } from "react";
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"
import { getActivities, getTeamByTeamId } from "@/app/api/useContentful";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { SearchResultContext } from "@/app/context/createContext";
import ActivityCard from "@/app/components/ActivityCard";

const TeamPage = () => {

    const { searchItem } = useContext(SearchResultContext)

    const [team, setTeam] = useState(null)

    const [activities, setActivities] = useState()


    useEffect(() => {

        searchItem && getTeamByTeamId(searchItem.teamId).then((res) => {
            const jsonObj = JSON.parse(res)
            setTeam(jsonObj.data.fields)

        }).catch(error => console.log(error))

        searchItem && getActivities(searchItem.teamName).then((res) => {
            const jsonObj = JSON.parse(res)
            console.log(jsonObj.data.items)
            setActivities(jsonObj.data.items)

        }).catch(error => console.log(error))

    }, [searchItem])



    // const router = useRouter()
    // const teamName = router.query.teamName
    return (

        team &&

                <Accordion id="teamDetailCollapse" selectionMode="multiple">
                    <AccordionItem key="1" aria-label="Team Name" title="Team Name">
                        {team.teamNameFull}
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Team Leaders" title="Team Leaders">
                        <div key="acc-2" className="px-2 grid w-full grid-cols-2 md:grid-cols-5">
                            {team.teamLeaders.map(name => <div key={`leader-${name}`}>{name}</div>)}
                        </div>

                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Team Members" title="Team Members">
                        <div key="acc-3" className="px-2 grid w-full grid-cols-2 md:grid-cols-5">
                            {team.teamMembers.map(name => <div key={`member-${name}`}>{name}</div>)}
                        </div>
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Team Activities" title="Team Activities">
                        <div key="acc-4" className="px-2 grid w-full grid-cols-1 md:grid-cols-3 gap-2">
                            {activities?.map(act => <ActivityCard key={`card-${act.sys.id}`} dateTime={act.fields.dateTime} title={act.fields.name}
                                picUrl={act.fields.portfolioPicUrl} activityId={act.sys.id}
                            />)}
                        </div>
                    </AccordionItem>

                </Accordion>

    )
}

export default TeamPage