import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useSelector } from "react-redux";

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

  const locale = useSelector((state) => state.locale.value);

  useEffect(() => {
    document.body.style.overflow = "unset";
    getActivityPageSetting(locale).then((res) => {
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
            {dateTime?.split("T")[0]}
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
