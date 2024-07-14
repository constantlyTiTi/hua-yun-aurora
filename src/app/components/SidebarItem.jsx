
import React from "react";

const SidebarItem = ({ teamNameShort, teamNameFull, onclick,sysId}) => {


    return (
        <div key={`sidebarItem-${sysId}`} onClick={() => onclick(teamNameShort)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span key={`sidebarItemSpan-${sysId}`} className="ms-3">{teamNameFull}</span>
        </div>
    )
}

export default SidebarItem