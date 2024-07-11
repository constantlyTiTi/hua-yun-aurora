import Sidebar from "@/app/components/Sidebar"
import React from "react"
import {getTeams} from '@/app/api/useContentful'
import Provider from "../providers"

export default async function TeamsLayout({
    children, // will be a page or nested layout
  }) {
    const sidebarItems = await getTeams()

    return (
      <Provider>
      <section className="flex w-dvw h-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        {sidebarItems?.data && <Sidebar teams={sidebarItems.data.items}/>}
   
        {children}
      </section>
      </Provider>
    )
  }