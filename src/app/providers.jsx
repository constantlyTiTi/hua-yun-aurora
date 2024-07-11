'use client'

import { SearchResultContext } from "./context/createContext"
import { useState } from "react"

const Provider = ({ children }) => {

    const [searchItem, setSearchItem] = useState()

    return (
        <SearchResultContext.Provider value={{ searchItem, setSearchItem }}>
            {children}
        </SearchResultContext.Provider>
    )
}

export default Provider