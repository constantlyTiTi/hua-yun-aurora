import SignUp from "@/app/components/SignUp";
import React from "react";
import { getAuthSetting } from "@/app/api/getContentful";

const Page = async () => {
  const settingData = await getAuthSetting();

  const setting = settingData?.data?.items[0]?.fields;

  return <SignUp setting={setting} />;
};

export default Page;
