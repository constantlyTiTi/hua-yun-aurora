import React from "react";

const teamPage = () =>{

    const router = useRouter()
    const teamName = router.query.teamName
    return (
        <>
        {teamName}
        </>
    )
}