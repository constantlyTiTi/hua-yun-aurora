'use client'

import { SearchResultContext } from "./context/createContext"
import { useState } from "react"
import { BrowserRouter } from 'react-router-dom'

const Provider = ({ children }) => {

    const [searchItem, setSearchItem] = useState({})

    return (
        <SearchResultContext.Provider value={{ searchItem, setSearchItem }}>
            {/* <BrowserRouter> */}
            {children}
            {/* </BrowserRouter> */}
        </SearchResultContext.Provider>
    )
}

export default Provider