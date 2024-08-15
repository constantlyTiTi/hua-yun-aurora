"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getIntroduction } from "@/app/api/getContentful";
import { useSelector } from "react-redux";

const Introduction = () => {
  const locale = useSelector((state) => state.locale.value);

  const [introduction, setIntroduction] = useState();

  useEffect(() => {
    if (locale) {
      getIntroduction(locale).then((res) => {
        const jsonObj = JSON.parse(res);

        jsonObj.data.items.length > 0 &&
          setIntroduction(jsonObj.data.items[0].fields);
      });
    }
  }, [locale]);

  return (
    introduction && (
      <div className="flex w-full flex-col content-start gap-5 md:flex-row">
        <div className="flex size-full sm:size-7/12 md:size-5/12">
          {introduction.introductionImageUrl && (
            <img
              className="rounded-lg"
              src={introduction.introductionImageUrl}
              alt="group desciption picture"
            />
          )}
        </div>
        <div className="m-auto flex-1 px-5 text-center">
          {documentToReactComponents(introduction.groupDescription)}
          <Link
            type="button"
            href="/teams"
            className="mb-2 me-2 mt-5 inline-block w-auto rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {introduction.buttonText}
          </Link>
        </div>
      </div>
    )
  );
};

export default Introduction;
