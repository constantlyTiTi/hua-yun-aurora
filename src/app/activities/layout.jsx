import Sidebar from "@/app/components/Sidebar"
import React from "react"
import {getTeams} from '@/app/api/getContentful'

export default async function ActivityLayout({
    children, // will be a page or nested layout
  }) {
    const sidebarItemsJson = await getTeams()
    const sidebarItems = JSON.parse(sidebarItemsJson)

    return (

      <section className="w-dvw relative top-0 flex flex-row">
        {/* Include shared UI here e.g. a header or sidebar */}
        {sidebarItems?.data && <Sidebar teams={sidebarItems.data.items}/>}
   
        <div className="sm:ml-64 p-4 flex-1">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex">
        {children}
        </div>
        </div>
      </section>
   
    )
  }