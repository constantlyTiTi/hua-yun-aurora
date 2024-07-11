import Sidebar from "@/app/components/Sidebar"
import React from "react"

export default function TeamsLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section className="flex w-dvw h-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Sidebar/>
   
        {children}
      </section>
    )
  }