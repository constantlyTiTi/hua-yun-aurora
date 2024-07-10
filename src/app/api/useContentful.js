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
}