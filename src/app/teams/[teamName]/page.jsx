'use client'
import React, { useContext,useState, useEffect  } from "react";
import { getActivities, getTeamByTeamId as getTeamByTeamName } from "@/app/api/useContentful";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { SearchResultContext } from "@/app/context/createContext";
import ActivityCard from "@/app/components/ActivityCard";
import { useSearchParams } from 'next/navigation'

const TeamPage = ({params}) => {

    const searchItem = params.teamName

    const [team, setTeam] = useState(null)

    const [activities, setActivities] = useState()


    useEffect(() => {

        searchItem && getTeamByTeamName(searchItem).then((res) => {
            const jsonObj = JSON.parse(res)

            jsonObj.data.items.length > 0 && setTeam(jsonObj.data.items[0].fields)

        }).catch(error => console.log(error))

        searchItem && getActivities(searchItem).then((res) => {
            const jsonObj = JSON.parse(res)
            setActivities(jsonObj.data.items)

        }).catch(error => console.log(error))

    }, [searchItem])

    return (

        team &&

                <Accordion id="teamDetailCollapse" selectionMode="multiple" defaultExpandedKeys={["1","4"]}>
                    <AccordionItem key="1" aria-label="Team Name" title="Team Name">
                        {team.teamNameFull}
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Team Leaders" title="Team Leaders">
                        <div key="acc-2" className="px-2 grid w-full grid-cols-2 md:grid-cols-5">
                            {team.teamLeaders?.map(name => <div key={`leader-${name}`}>{name}</div>)}
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