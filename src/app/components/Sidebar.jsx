"use client";
import React, { useEffect, useState } from "react";
import SidebarItem from "@/app/components/SidebarItem";
import { useRouter } from "next/navigation";
import { getParentTeams, getTeamPageHeaders } from "@/app/api/getContentful";

const Sidebar = () => {
  const router = useRouter();
  const [teams, setTeams] = useState();
  const [header, setHeader] = useState();

  useEffect(() => {
    getParentTeams().then((res) => {
      const sidebarItems = JSON.parse(res);
      sidebarItems?.data?.items && setTeams(sidebarItems?.data?.items);
    });

    getTeamPageHeaders().then((res) => {
      const jsonObj = JSON.parse(res);

      jsonObj.data.items.length > 0 && setHeader(jsonObj.data.items[0].fields);
    });
  }, []);

  const sidebarItemClick = (teamName) => {
    router.push(`/teams/${teamName}`);
  };

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="absolute left-0 top-0 z-30 h-full w-64 flex-none -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full space-y-2 overflow-y-auto bg-gray-50 px-3 py-4 font-medium dark:bg-gray-800">
        {/* <ul className="space-y-2 font-medium"> */}
        {header && (
          <>
            <div
              onClick={() => router.push("/teams")}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ms-3">{header.teamNewsName} </span>
            </div>
            <div
              onClick={() => router.push("/teams/orgnization")}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ms-3">
                {header.teamOrganizationManagementName}{" "}
              </span>
            </div>
          </>
        )}

        {teams?.map((t) => (
          <SidebarItem
            onclick={sidebarItemClick}
            key={`sidemenue-${t.sys.id}`}
            teamNameShort={t.fields.teamNameShort}
            teamNameFull={t.fields.teamNameFull}
          />
        ))}
        {/* </ul> */}
      </div>
    </aside>
  );
};

export default Sidebar;
