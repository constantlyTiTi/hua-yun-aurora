import { createClient } from "contentful"

const useContentful = () => {

    return createClient({
        space: process.env.NEXT_SPACE_ID,
        accessToken: process.env.NEXT_CONTENTFUL_API,
        host: process.env.NEXT_HOST
    })

}

const getTeams = () => {
    const client = useContentful()

    return client.getEntries({
        content_type:"teams",
        select:"fields",
        order:"fields.teamNameShort"
    })
}

const getTeamByTeamName = (teamNameShort) => {
    const client = useContentful()

    return client.getEntries({
        content_type:"teams",
        select:"fields",
        "fileds.teamNameShort":teamNameShort
    })
}

const getActivities = (teamNameShort) => {
    const client = useContentful()

    return client.getEntries({
        content_type:"activities",
        select:"fields",
        order:"fields.dateTime",
        "fields.teamNameShort":teamNameShort
    })
}

const getActivitiesByName = (activityName) => {
    const client = useContentful()

    return client.getEntries({
        content_type:"activities",
        select:"fields",
        "fields.name":activityName
    })
}

const getNews = ()=>{
    const client = useContentful()

    return client.getEntries({
        content_type:"news",
        select:"fields"
    })
}

export {getTeams, getTeamByTeamName, getActivities, getActivitiesByName, getNews}