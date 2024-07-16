import Sidebar from "@/app/components/Sidebar"
import React from "react"

export default async function ActivityLayout({
    children, // will be a page or nested layout
  }) {

    return (

      <section className="w-svw relative top-0 flex flex-row h-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Sidebar/>
   
        <div className="sm:ml-64 p-4 flex-1">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex">
        {children}
        </div>
        </div>
      </section>
   
    )
  }