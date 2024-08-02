"use client";
import React, { useState, useEffect, useRef } from "react";
import { getParentTeams } from "../api/getContentful";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTeamPageHeaders } from "@/app/api/getContentful";

const Header = ({ settings }) => {
  const { header, iconHeaderImageUrl } = settings;

  const [headerItems, setHeaderItems] = useState();

  const [headerTitles, setHeaderTitles] = useState();

  const [isDisplayDropDown, setIsDisplayDropDown] = useState(false);

  const router = useRouter();

  const dropDownRef = useRef();

  const iconRef = useRef();

  useEffect(() => {
    getParentTeams()
      .then((res) => setHeaderItems(JSON.parse(res).data.items))
      .catch((err) => console.log(err));
    getTeamPageHeaders().then((res) => {
      const jsonObj = JSON.parse(res);

      jsonObj.data.items.length > 0 &&
        setHeaderTitles(jsonObj.data.items[0].fields);
    });
  }, []);

  const sidebarItemClick = (teamName) => {
    router.push(`/teams/${teamName}`);
    setIsDisplayDropDown(false);
  };

  const iconOnClick = () => {
    setIsDisplayDropDown(!isDisplayDropDown);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsDisplayDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    headerItems && (
      <>
        <header className="relative sticky top-0 z-40 flex h-20 w-full flex-none flex-col overflow-visible bg-white shadow-lg">
          <nav
            className="h-25 flex items-center py-6 lg:px-8"
            aria-label="Global"
          >
            <div
              className="w-auto flex-none px-6"
              onClick={() => iconOnClick()}
              ref={iconRef}
            >
              <img
                className="h-8 w-auto"
                src={iconHeaderImageUrl}
                alt="website icon"
              />
            </div>

            <div className="w-64 flex-1 justify-center">
              <div className="justify-none relative">
                <h5 className="text-lg font-semibold leading-6 text-gray-900">
                  {header}
                </h5>
              </div>
            </div>

            {/* <div className="justify-right grid w-auto flex-none grid-cols-2 gap-4">
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Login</Link>
            </div> */}
          </nav>
          <div
            ref={dropDownRef}
            className={`top-25 z-50 ml-0 flex h-svh max-h-svh w-full flex-none flex-col divide-y divide-gray-100 overflow-y-auto rounded-lg bg-white pr-5 shadow-xl sm:mb-2 sm:ml-6 sm:w-fit md:h-auto dark:bg-gray-700 ${isDisplayDropDown ? "block" : "hidden"}`}
          >
            <div className="group block flex justify-end rounded-lg p-2 text-gray-900 hover:bg-gray-100 sm:hidden dark:text-white dark:hover:bg-gray-700">
              <svg
                onClick={() => setIsDisplayDropDown(!isDisplayDropDown)}
                className="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <Link
              href="/"
              key="header-home"
              onClick={() => setIsDisplayDropDown(!isDisplayDropDown)}
              className="ms-3 block items-center"
            >
              <div className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                {" "}
                Home
              </div>
            </Link>

            <Link
              href="/teams"
              onClick={() => setIsDisplayDropDown(!isDisplayDropDown)}
              key="header-teamNews"
              className="ms-3 block items-center"
            >
              {headerTitles && (
                <div className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  {" "}
                  {headerTitles.teamNewsName}
                </div>
              )}
            </Link>

            {headerItems?.map((t) => (
              <SidebarItem
                onclick={sidebarItemClick}
                key={`sidebarItem-${t.sys.id}`}
                sysId={t.sys.id}
                teamNameShort={t.fields.teamNameShort}
                teamNameFull={t.fields.teamNameFull}
              />
            ))}
          </div>
        </header>
      </>
    )
  );
};

export default Header;
