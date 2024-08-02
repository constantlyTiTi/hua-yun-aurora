import Sidebar from "@/app/components/Sidebar";
import React from "react";

export default async function ActivityLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="relative top-0 flex h-full w-svw flex-row">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Sidebar />

      <div className="flex-1 p-4 sm:ml-64">
        <div className="flex rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </div>
    </section>
  );
}
