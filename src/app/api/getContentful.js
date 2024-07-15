'use server'
import { createClient } from "contentful"

const connectContentful = () => {

    return createClient({
        space: process.env.NEXT_SPACE_ID,
        accessToken: process.env.NEXT_CONTENTFUL_API,
        host: process.env.NEXT_HOST
    })

}

const getWebSetting = () => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"websiteSetting",
        select:"fields",
        order:"-fields.version"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getIntroduction = () => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"introduction",
        select:"fields",
        order:"-fields.version"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getTeamPageHeaders = () => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"teamPageHeaderSetting",
        select:"fields",
        order:"-fields.version"
    }).then(res => (JSON.stringify({data:res}))).catch(err =>  JSON.stringify({error:err}))
}

const getTeams = () => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"teams",
        select:"fields",
        order:"fields.order"
    }).then(res => (JSON.stringify({data:res}))).catch(err =>  JSON.stringify({error:err}))
}

const getTeamByTeamName = (teamNameShort) => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"teams",
        select:"fields",
        order:"fields.order",
        "fields.teamNameShort[match]":teamNameShort
    }).then(res => (JSON.stringify({data:res}))).catch(err => JSON.stringify({error:err}))
}

const getActivities = (teamNameShort) => {
    const client = connectContentful()

    return client.getEntries({
        content_type:"activities",
        select:"fields",
        order:"-fields.dateTime",
        "fields.teamNamesShort[match]":teamNameShort
    }).then(res => JSON.stringify({data:res})).catch(err =>  JSON.stringify({error:err}))
}

const getActivityById = (activityId) => {
    const client = connectContentful()

    return client.getEntry(activityId).then(res => JSON.stringify({data:res})).catch(err => JSON.stringify({error:err}))
}

const getNews = ()=>{
    const client = connectContentful()

    return client.getEntries({
        content_type:"news",
        select:"fields",
        order:"-fields.dateTime"
    }).then(res => JSON.stringify({data:res})).catch(err =>  JSON.stringify({error:err}))
}

export {getWebSetting,getIntroduction, getTeams, getTeamByTeamName, getActivities, getActivityById, getNews, getTeamPageHeaders}