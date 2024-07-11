'use client'
import React, { useContext } from "react";
import SidebarItem from "@/app/components/sidebarItem";
import { SearchResultContext } from "@/app/context/createContext";
import {useRouter } from 'next/navigation'


const Sidebar = ({teams}) => {

    const {setSearchItem} = useContext(SearchResultContext)

    const router = useRouter()

    const sidebarItemClick = (teamName, teamId)=>{
        router.push(`/teams/${teamName}`)
        setSearchItem(teamId)
    }

    return (
        <aside id="logo-sidebar" className="flex-none w-64 pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className=" px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
        {
            teams?.map(t=> <SidebarItem onclick={sidebarItemClick} key={`sidemenue-${t.key}`} teamNameShort={t.fields.teamNameShort} teamNameFull={t.fields.teamNameFull} teamId = {t.sys.id}/>)
        }
        </ul>
        </div>
        </aside>
    )
}

export default Sidebar