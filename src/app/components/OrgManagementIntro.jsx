"use client";
import React, { useState, useEffect } from "react";
import {
  getOrganizationManagementTeamMembers,
  getManagementLevelResponsiblities,
} from "@/app/api/getContentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { useSelector } from "react-redux";

const OrgManagementIntro = () => {
  const [teamMembers, setTeamMemembers] = useState();
  const [responsibilites, setResponsiblities] = useState();
  const locale = useSelector((state) => state.locale.value);

  useEffect(() => {
    getOrganizationManagementTeamMembers(locale).then((res) => {
      const membersData = JSON.parse(res);
      membersData?.data?.items && setTeamMemembers(membersData?.data?.items);
    });

    getManagementLevelResponsiblities(locale).then((res) => {
      const resp = JSON.parse(res);
      console.log("resp", resp?.data?.items);
      resp?.data?.items && setResponsiblities(resp?.data?.items);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2">
      {teamMembers?.map((member, index) => (
        <div
          key={`card-${index}`}
          className="grid grid-cols-1 gap-2 border-2 border-solid border-indigo-300 p-2 sm:grid-cols-2"
        >
          <div
            key={`cardContent-${index}`}
            className="border-solid p-2 sm:pl-5"
          >
            <h2 key={`cardContentH2-${index}`} className="text-2xl">
              {member.fields.memberName}
            </h2>
            <p
              key={`cardContentOcc-${index}`}
              className="mt-2 text-base text-gray-600"
            >
              {member.fields.occupation}
            </p>

            <div
              key={`cardContentDes-${index}`}
              className="mt-2 text-wrap break-all text-base"
            >
              {documentToReactComponents(member.fields.description)}
            </div>
            <div key={`cardContentResponsibilites-${index}`} className="mt-5">
              {responsibilites?.map(
                (res, index) =>
                  res.fields.staffNames?.find(
                    (name) => name === member.fields.memberName,
                  ) && (
                    <Link
                      key={`responsibilityLink-${index}`}
                      href={`/activities/managementResponsibility/${res.fields.responsibilityShortName}`}
                      className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span
                        key={`responsibilityLinkSpan-${index}`}
                        className="w-full"
                      >
                        {res.fields.responsibilityName}
                      </span>
                    </Link>
                  ),
              )}
            </div>
          </div>

          <div className="text-center">
            <img
              key={`cardContentImg-${index}`}
              className="m-auto h-64 w-auto sm:h-96"
              alt="portfolio img"
              src={member.fields.portfolioPicUrl}
            />

            {member.fields.tel && (
              <p
                key={`cardContentTel-${index}`}
                className="mt-2 block text-base"
              >
                Tel: +1 {member.fields.tel}
              </p>
            )}
            {member.fields.email && (
              <a
                key={`cardContentEmail-${index}`}
                className="mt-2 block text-base"
                href={`mailto: ${member.fields.email}`}
              >
                Email: {member.fields.email}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgManagementIntro;
