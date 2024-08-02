"use client";
import React, { useState, useEffect } from "react";
import {
  getActivities,
  getLevel2TeamByTeamName,
  getTeamPageHeaders,
} from "@/app/api/getContentful";
import SubTeam from "@/app/components/SubTeam";
import { useRouter } from "next/navigation";

const SubTeamPage = ({ params }) => {
  const searchItem = params.subTeamName;

  const [team, setTeam] = useState();

  const [header, setHeader] = useState();

  const [activities, setActivities] = useState();

  const router = useRouter();

  useEffect(() => {
    searchItem &&
      getLevel2TeamByTeamName(searchItem)
        .then((res) => {
          const jsonObj = JSON.parse(res);

          jsonObj.data.items.length > 0 &&
            setTeam(jsonObj.data.items[0].fields);
        })
        .catch((error) => console.log(error));

    searchItem &&
      getActivities(searchItem)
        .then((res) => {
          const jsonObj = JSON.parse(res);
          setActivities(jsonObj.data.items);
        })
        .catch((error) => console.log(error));

    getTeamPageHeaders().then((res) => {
      const jsonObj = JSON.parse(res);

      jsonObj.data.items.length > 0 && setHeader(jsonObj.data.items[0].fields);
    });
  }, [searchItem]);

  return (
    team &&
    header && (
      <>
        <button
          class="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <SubTeam team={team} header={header} activities={activities} />
      </>
    )
  );
};

export default SubTeamPage;
