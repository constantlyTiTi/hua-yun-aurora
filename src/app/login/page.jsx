import Login from "@/app/components/Login";
import React from "react";
import { getAuthSetting } from "@/app/api/getContentful";

const Page = async () => {
  const settingData = await getAuthSetting();

  const setting = settingData?.data?.items[0]?.fields;

  return <Login setting={setting} />;
};

export default Page;
