import React from "react"

export default async function SignUpLayout({
    children, // will be a page or nested layout
  }) {

    return (
        <section className="w-svw relative top-0 flex flex-row">
        {children}
      </section>
   
    )
  }