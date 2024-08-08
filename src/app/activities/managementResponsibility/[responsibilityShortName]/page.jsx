"use client";
import React, { useState, useEffect } from "react";

import { getActivityByResponsiblity } from "@/app/api/getContentful";
import ActivityCard from "@/app/components/ActivityCard";

const Page = ({ params }) => {
  const responsibilityShortName = params.responsibilityShortName;

  const [activities, setActivities] = useState();

  useEffect(() => {
    getActivityByResponsiblity(responsibilityShortName)
      .then((res) => {
        const jsonObj = JSON.parse(res);

        jsonObj.data.items.length > 0 && setActivities(jsonObj.data.items);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    activities && (
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        {activities.map((act) => (
          <ActivityCard
            key={`card-${act.sys.id}`}
            dateTime={act.fields.dateTime}
            title={act.fields.name}
            picUrl={act.fields.portfolioPicUrl}
            activityId={act.sys.id}
          />
        ))}
      </div>
    )
  );
};

export default Page;
