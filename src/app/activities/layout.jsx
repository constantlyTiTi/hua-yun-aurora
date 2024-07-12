import Sidebar from "@/app/components/Sidebar"
import React from "react"
import {getTeams} from '@/app/api/useContentful'

export default async function ActivityLayout({
    children, // will be a page or nested layout
  }) {
    const sidebarItemsJson = await getTeams()
    const sidebarItems = JSON.parse(sidebarItemsJson)

    return (

      <section className="flex w-dvw h-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        {sidebarItems?.data && <Sidebar teams={sidebarItems.data.items}/>}
   
        <div className="sm:ml-64 p-4">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {children}
        </div>
        </div>
      </section>
   
    )
  }