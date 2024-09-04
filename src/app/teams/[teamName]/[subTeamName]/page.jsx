"use client";
import React, { useState, useEffect } from "react";
import {
  getActivities,
  getLevel2TeamByTeamName,
  getTeamPageHeaders,
} from "@/app/api/getContentful";
import SubTeam from "@/app/components/SubTeam";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SubTeamPage = ({ params }) => {
  const searchItem = params.subTeamName;

  const [team, setTeam] = useState();

  const [header, setHeader] = useState();

  const [activities, setActivities] = useState();

  const locale = useSelector((state) => state.locale.value);

  const router = useRouter();

  useEffect(() => {
    searchItem &&
      locale &&
      getLevel2TeamByTeamName(searchItem, locale)
        .then((res) => {
          const jsonObj = JSON.parse(res);

          jsonObj.data.items.length > 0 &&
            setTeam(jsonObj.data.items[0].fields);
        })
        .catch((error) => console.log(error));

    searchItem &&
      locale &&
      getActivities(searchItem, locale)
        .then((res) => {
          const jsonObj = JSON.parse(res);
          setActivities(jsonObj.data.items);
        })
        .catch((error) => console.log(error));

    locale &&
      getTeamPageHeaders(locale).then((res) => {
        const jsonObj = JSON.parse(res);

        jsonObj.data.items.length > 0 &&
          setHeader(jsonObj.data.items[0].fields);
      });
  }, [searchItem, locale]);

  return (
    team &&
    header && (
      <>
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
