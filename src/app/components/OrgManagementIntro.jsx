"use client";
import React, { useState, useEffect } from "react";
import { getOrganizationManagementTeamMembers } from "@/app/api/getContentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const OrgManagementIntro = () => {
  const [teamMembers, setTeamMemembers] = useState();

  useEffect(() => {
    getOrganizationManagementTeamMembers().then((res) => {
      const membersData = JSON.parse(res);
      membersData?.data?.items && setTeamMemembers(membersData?.data?.items);
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
            {member.fields.email && (
              <a
                key={`cardContentEmail-${index}`}
                className="mt-2 block text-base"
                href={`mailto: ${member.fields.email}`}
              >
                Email: {member.fields.email}
              </a>
            )}
            {member.fields.tel && (
              <p
                key={`cardContentTel-${index}`}
                className="mt-2 block text-base"
              >
                Tel: +1 {member.fields.tel}
              </p>
            )}

            <div
              key={`cardContentDes-${index}`}
              className="mt-2 text-wrap break-all text-base"
            >
              {documentToReactComponents(member.fields.description)}
            </div>
          </div>

          <div>
            <img
              key={`cardContentImg-${index}`}
              className="m-auto h-64 w-auto sm:h-96"
              alt="portfolio img"
              src={member.fields.portfolioPicUrl}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgManagementIntro;
