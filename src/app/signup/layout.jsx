import React from "react";

export default async function SignUpLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="relative top-0 flex w-svw flex-row">{children}</section>
  );
}
