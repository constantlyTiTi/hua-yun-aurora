'use server'
import { createClient } from "contentful"

const useContentful = () => {

    return createClient({
        space: process.env.NEXT_SPACE_ID,
        accessToken: process.env.NEXT_CONTENTFUL_API,
        host: process.env.NEXT_HOST
    })

}

const getWebSetting = () => {
    const client = useContentful()

    return client.getEntries({
        content_type:"websiteSetting",
        select:"fields"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getIntroduction = () => {
    const client = useContentful()

    return client.getEntries({
        content_type:"introduction",
        select:"fields"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getTeams = () => {
    const client = useContentful()

    return client.getEntries({
        content_type:"teams",
        select:"fields",
        order:"fields.teamNameShort"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getTeamByTeamName = (teamId) => {
    const client = useContentful()

    return client.getEntry(teamId).then(res => (JSON.stringify({data:res}))).catch(err => JSON.stringify({error:err}))
}

const getActivities = (teamNameShort) => {
    const client = useContentful()

    console.log("abcded")

    return client.getEntries({
        content_type:"activities",
        select:"fields",
        order:"fields.dateTime",
        "fields.teamNameShort[match]":teamNameShort
    }).then(res => ({data:console.log("res",res)})).catch(err =>  ({error:JSON.stringify(err)}))
}

const getActivitiesByName = (activityName) => {
    const client = useContentful()

    return client.getEntries({
        content_type:"activities",
        select:"fields",
        "fields.name[match]":activityName
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

const getNews = ()=>{
    const client = useContentful()

    return client.getEntries({
        content_type:"news",
        select:"fields"
    }).then(res => ({data:res})).catch(err =>  ({error:err}))
}

export {getWebSetting,getIntroduction, getTeams, getTeamByTeamName, getActivities, getActivitiesByName, getNews}