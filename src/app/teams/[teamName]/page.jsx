'use client'
import React, { useState, useEffect } from "react";
import { getActivities, getTeamByTeamName, getTeamPageHeaders } from "@/app/api/getContentful";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import ActivityCard from "@/app/components/ActivityCard";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {itemClasses} from '@/app/const/css'

const TeamPage = ({ params }) => {

    const searchItem = params.teamName

    const [team, setTeam] = useState()

    const [header, setHeader] = useState()

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

        getTeamPageHeaders().then(res => {

            const jsonObj = JSON.parse(res)

            jsonObj.data.items.length > 0 && setHeader(jsonObj.data.items[0].fields)

        })

    }, [searchItem])



    return (

        team && header &&

        <Accordion id="teamDetailCollapse" variant="splitted" selectionMode="multiple" defaultExpandedKeys={["1", "6"]}  itemClasses={itemClasses}>
            <AccordionItem key="1" aria-label={header.teamName} title={header.teamName}>
                {team.teamNameFull}
            </AccordionItem>
            {team.teamLeaders?.length > 0 && <AccordionItem key="2" aria-label={header.teamLeadersName} title={header.teamLeadersName}>
                <div key="acc-2" className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
                    {team.teamLeaders.map(name => <div key={`leader-${name}`}>{name}</div>)}
                </div>

            </AccordionItem>}

            {
                team.teamMembers?.length > 0 && <AccordionItem key="3" aria-label={header.teamMemberName} title={header.teamMemberName}>
                    <div key="acc-3" className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {team.teamMembers.map(name => <div key={`member-${name}`}>{name}</div>)}
                    </div>
                </AccordionItem>
            }

            <AccordionItem key="4" aria-label={header.teamDescriptionName} title={header.teamDescriptionName}>
                <div key="acc-4" className="grid w-full">
                    {team.description && documentToReactComponents(team.description)}
                </div>
            </AccordionItem>
            <AccordionItem key="5" aria-label={header.contactName} title={header.contactName}>
                <div key="acc-5" className="grid w-full">
                    {team.contacts && documentToReactComponents(team.contacts)}
                </div>
            </AccordionItem>
            {
                activities?.length > 0 && <AccordionItem key="6" aria-label={header.teamActivityName} title={header.teamActivityName}>
                    <div key="acc-6" className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
                        {activities.map(act => <ActivityCard key={`card-${act.sys.id}`} dateTime={act.fields.dateTime} title={act.fields.name}
                            picUrl={act.fields.portfolioPicUrl} activityId={act.sys.id}
                        />)}
                    </div>
                </AccordionItem>
            }


        </Accordion>

    )
}

export default TeamPage