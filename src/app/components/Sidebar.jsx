'use client'
import React, { useContext } from "react";
import SidebarItem from "@/app/components/SidebarItem";
import { SearchResultContext } from "@/app/context/createContext";
import { useRouter } from 'next/navigation'


const Sidebar = ({ teams }) => {

    const router = useRouter()

    const sidebarItemClick = (teamName) => {
        router.push({
            pathname: `/teams/[teamName]`,
            query: { team_name:teamName },
          })
    }

    return (
        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-30 pt-20 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                {/* <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 h-full w-64 pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className=" px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800"> */}
                <ul className="space-y-2 font-medium">
                    {
                        teams?.map(t => <SidebarItem onclick={sidebarItemClick} key={`sidemenue-${t.sys.id}`} teamNameShort={t.fields.teamNameShort} teamNameFull={t.fields.teamNameFull}/>)
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar