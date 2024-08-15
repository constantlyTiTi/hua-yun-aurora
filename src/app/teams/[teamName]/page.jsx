"use client";
import React, { useState, useEffect } from "react";
import { getTeamByTeamName, getTeamPageHeaders } from "@/app/api/getContentful";
import ParentTeam from "@/app/components/ParentTeam";
import { useSelector } from "react-redux";

const TeamPage = ({ params }) => {
  const searchItem = params.teamName;

  const [team, setTeam] = useState();

  const [header, setHeader] = useState();
  const locale = useSelector((state) => state.locale.value);

  useEffect(() => {
    searchItem &&
      getTeamByTeamName(searchItem, locale)
        .then((res) => {
          const jsonObj = JSON.parse(res);

          jsonObj.data.items.length > 0 &&
            setTeam(jsonObj.data.items[0].fields);
        })
        .catch((error) => console.log(error));

    getTeamPageHeaders(locale).then((res) => {
      const jsonObj = JSON.parse(res);

      jsonObj.data.items.length > 0 && setHeader(jsonObj.data.items[0].fields);
    });
  }, [searchItem]);

  return team && header && <ParentTeam team={team} header={header} />;
};

export default TeamPage;
