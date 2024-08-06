import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { getActivityPageSetting } from "@/app/api/getContentful";

import { itemClasses } from "@/app/const/css";
import ImageGallery from "./ImageGallery";

const ActivityDetails = ({
  title,
  dateTime,
  description,
  picsUrls,
  videoUrls,
}) => {
  const [setting, setSetting] = useState();

  const [isScaleOpen, setIsScaleOpen] = useState(false);

  const [imageIndex, setImageIndex] = useState();

  useEffect(() => {
    getActivityPageSetting().then((res) => {
      const jsonObj = JSON.parse(res);

      jsonObj.data.items.length > 0 && setSetting(jsonObj.data.items[0].fields);
    });
  }, []);

  const imageOnClick = (index) => {
    setImageIndex(index);
    setIsScaleOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeScaleImage = () => {
    setIsScaleOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    setting && (
      <div className="grid w-full gap-3 p-3 text-left">
        <ImageGallery
          isScaleOpen={isScaleOpen}
          imgIndex={imageIndex}
          setImageIndex={setImageIndex}
          images={picsUrls}
          closeScaleImage={closeScaleImage}
        />
        {/* <div
          className={`fixed left-0 top-0 z-50 flex h-svh w-full flex-col overflow-auto bg-black ${isScaleOpen ? "block" : "hidden"}`}
        >
          <div className="group flex justify-end p-2">
            <svg
              onClick={closeScaleImage}
              className="h-8 w-8 rounded-lg text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          {scaleImageUrl && (
            <img
              className="m-auto h-auto w-auto rounded-lg p-3"
              src={scaleImageUrl}
              alt="activity picture"
            />
          )}
        </div> */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <Accordion
          id="activityDetails"
          variant="splitted"
          selectionMode="multiple"
          defaultExpandedKeys={["1", "2", "3", "4"]}
          itemClasses={itemClasses}
        >
          <AccordionItem
            key="1"
            aria-label={setting.activityDateHeader}
            title={setting.activityDateHeader}
          >
            {dateTime.split("T")[0]}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label={setting.activityDescriptionHeader}
            title={setting.activityDescriptionHeader}
          >
            {description}
          </AccordionItem>

          {picsUrls?.length > 0 && (
            <AccordionItem
              key="3"
              aria-label={setting.imageHeader}
              title={setting.imageHeader}
            >
              <div
                key="acc-3"
                className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {picsUrls.map((url, index) => (
                  <div onClick={() => imageOnClick(index)} key={`pic-${index}`}>
                    {" "}
                    <img
                      className="h-auto max-w-full rounded-lg"
                      key={`image-${index}`}
                      src={url}
                      alt="activity picture"
                    />
                  </div>
                ))}
              </div>
            </AccordionItem>
          )}

          {videoUrls?.length > 0 && (
            <AccordionItem
              key="4"
              aria-label={setting.videoHeader}
              title={setting.videoHeader}
            >
              <div
                key="acc-4"
                className="grid w-auto grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {videoUrls.map((url, index) => (
                  <video
                    key={`video-${index}`}
                    preload="metadata"
                    className="h-full w-full"
                    controls
                  >
                    <source
                      key={`source-${index}`}
                      src={`${url}#t=0.001`}
                      type="video/mp4"
                    />
                    <img
                      src={url}
                      title="Your browser does not support the <video> tag"
                    />
                  </video>
                ))}
              </div>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    )
  );
};

export default ActivityDetails;
