import React from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getIntroduction } from "@/app/api/getContentful";

const Introduction = async () => {
  const intro = await getIntroduction();

  const introduction = intro?.data?.items[0]?.fields;

  const richText = documentToReactComponents(introduction.groupDescription);

  return (
    introduction && (
      <div className="flex w-full flex-col content-start gap-5 md:flex-row">
        <div className="flex-none">
          {introduction.introductionImageUrl && (
            <img
              className="h-auto max-w-full rounded-lg"
              src={introduction.introductionImageUrl}
              alt="group desciption picture"
            />
          )}
        </div>
        <div className="m-auto flex-1 px-5 text-center">
          {richText}
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
