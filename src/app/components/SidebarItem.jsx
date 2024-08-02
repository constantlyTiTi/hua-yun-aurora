import React from "react";

const SidebarItem = ({ teamNameShort, teamNameFull, onclick, sysId }) => {
  return (
    <div
      key={`sidebarItem-${sysId}`}
      onClick={() => onclick(teamNameShort)}
      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    >
      <span key={`sidebarItemSpan-${sysId}`} className="ms-3">
        {teamNameFull}
      </span>
    </div>
  );
};

export default SidebarItem;
