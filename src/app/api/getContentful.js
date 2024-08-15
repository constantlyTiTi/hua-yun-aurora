"use server";
import { createClient } from "contentful";

const connectContentful = () => {
  return createClient({
    space: process.env.NEXT_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_API,
    host: process.env.NEXT_HOST,
  });
};

const getWebSetting = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "websiteSetting",
      select: "fields",
      order: "-fields.version",
      locale: locale,
    })
    .then((res) => ({ data: res }))
    .catch((err) => ({ error: err }));
};

const getAuthSetting = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "authenticationPageSetUp",
      select: "fields",
      order: "-fields.version",
      locale: locale,
    })
    .then((res) => ({ data: res }))
    .catch((err) => ({ error: err }));
};

const getIntroduction = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "introduction",
      select: "fields",
      order: "-fields.version",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getOrganizationManagementTeamMembers = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "organizationManagementTeamMember",
      select: "fields",
      order: "fields.order",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getTeamPageHeaders = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "teamPageHeaderSetting",
      select: "fields",
      order: "-fields.version",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getActivityPageSetting = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "activitiesPageHeaderSetting",
      select: "fields",
      order: "-fields.version",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getParentTeams = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "teams",
      select: "fields",
      order: "fields.order",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getLevel2Teams = (parentTeamName, locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "teamsLevel2",
      select: "fields",
      order: "fields.order",
      "fields.parentTeam[match]": parentTeamName,
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getTeamByTeamName = (teamNameShort, locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "teams",
      select: "fields",
      order: "fields.order",
      "fields.teamNameShort[match]": teamNameShort,
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getLevel2TeamByTeamName = (teamNameShort, locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "teamsLevel2",
      select: "fields",
      order: "fields.order",
      "fields.teamNameShort[match]": teamNameShort,
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getActivities = (teamNameShort, locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "activities",
      select: "fields",
      order: "-fields.dateTime",
      "fields.teamNamesShort[match]": teamNameShort,
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getActivityById = (activityId, locale) => {
  const client = connectContentful();

  return client
    .getEntry({ entry_id: activityId, locale: locale })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getNews = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "news",
      select: "fields",
      order: "-fields.dateTime",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getManagementLevelResponsiblities = (locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "managementLevelResponsibilities",
      select: "fields",
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

const getActivityByResponsiblity = (responsibilityShortName, locale) => {
  const client = connectContentful();

  return client
    .getEntries({
      content_type: "activities",
      select: "fields",
      order: "-fields.dateTime",
      "fields.responsibilityShortName[match]": responsibilityShortName,
      locale: locale,
    })
    .then((res) => JSON.stringify({ data: res }))
    .catch((err) => JSON.stringify({ error: err }));
};

export {
  getWebSetting,
  getIntroduction,
  getParentTeams,
  getTeamByTeamName,
  getActivities,
  getActivityById,
  getNews,
  getTeamPageHeaders,
  getActivityPageSetting,
  getLevel2Teams,
  getLevel2TeamByTeamName,
  getAuthSetting,
  getOrganizationManagementTeamMembers,
  getManagementLevelResponsiblities,
  getActivityByResponsiblity,
};
