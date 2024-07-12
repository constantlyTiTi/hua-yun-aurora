'use client'
import React from "react";
import SidebarItem from "@/app/components/SidebarItem";
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Sidebar = ({ teams }) => {

    const router = useRouter()

    const sidebarItemClick = (teamName) => {
        console.log(router)
        router.push(`/teams/${teamName}`)

        console.log(teamName)
    }

    return (
        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-30 pt-20 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                {/* <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 h-full w-64 pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className=" px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800"> */}
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <Link href="/teams" key='header-home' className="block items-center ms-3" >Teams News</Link></div>
                <ul className="space-y-2 font-medium">
                    {
                        teams?.map(t => <SidebarItem onclick={sidebarItemClick} key={`sidemenue-${t.sys.id}`} teamNameShort={t.fields.teamNameShort} teamNameFull={t.fields.teamNameFull} />)
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar