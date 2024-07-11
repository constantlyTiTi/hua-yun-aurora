'use client'
import React, { useContext } from "react";
import { usePathname } from 'next/navigation'
import {useState, useEffect} from "react"
import { getTeamByTeamName } from "@/app/api/useContentful";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import { SearchResultContext } from "@/app/context/createContext";

const TeamPage = () =>{

    const {searchItem} = useContext(SearchResultContext)

    const [team, setTeam] = useState(null)

    const [activities, setActivities] = useState()


    useEffect(()=>{

        searchItem && getTeamByTeamName(searchItem).then((res) => {
            const jsonObj = JSON.parse(res)
            console.log(jsonObj)
            setTeam(jsonObj.data.fields)
            
        }).catch(error => console.log(error))

    },[searchItem])



    // const router = useRouter()
    // const teamName = router.query.teamName
    return (

        team && <Accordion id="teamDetailCollapse" selectionMode="multiple">
        <AccordionItem key="1" aria-label="Team Name" title="Team Name">
          {team.teamNameFull}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Team Leaders" title="Team Leaders">
            <div className="grid w-full grid-cols-5">
            {team.teamLeaders.map(name => <div key={`leader-${name}`}>{name}</div>)}
            </div>
         
        </AccordionItem>
        <AccordionItem key="3" aria-label="Team Members" title="Team Members">
        <div className="grid w-full grid-cols-5">
            {team.teamMembers.map(name => <div key={`member-${name}`}>{name}</div>)}
            </div>
        </AccordionItem>
        <AccordionItem key="4" aria-label="Team Activities" title="Team Activities">
          
        </AccordionItem>

      </Accordion>
    
    )
}

export default TeamPage