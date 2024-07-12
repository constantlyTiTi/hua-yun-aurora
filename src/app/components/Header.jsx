'use client'
import React,{useState,useEffect,useContext, useRef} from "react";
import { getTeams } from "../api/useContentful";
import SidebarItem from "./SidebarItem";
import { useRouter } from 'next/navigation'
import { SearchResultContext } from "../context/createContext";

const Header = ({ header, iconHeaderImageUrl }) => {

    const [headerItems, setHeaderItems] = useState()

    const [isDisplayDropDown, setIsDisplayDropDown] = useState(false)

    const router = useRouter()

    const dropDownRef = useRef()

    const {setSearchItem} = useContext(SearchResultContext)

    useEffect(()=>{
        getTeams().then(res=> setHeaderItems(JSON.parse(res).data.items)).catch(err=>console.log(err))
    },[])

    const sidebarItemClick = (teamName, teamId) => {
        router.push(`/teams/${teamName}`)
        setSearchItem({
            "teamName": teamName,
            "teamId": teamId
        })
        setIsDisplayDropDown(false)
    }

    useEffect(() => {

        function handleClickOutside(event) {
          if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setIsDisplayDropDown(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropDownRef]);


    return (headerItems && 
        <>
            <header className='sticky top-0 z-50 bg-white max-h-32 w-dvw'>
                <nav className="mx-auto flex justify-initial items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex-none w-20" ref={dropDownRef}>
                    <img className="h-8 w-auto" src={iconHeaderImageUrl} alt="website icon" onClick = {()=>setIsDisplayDropDown(!isDisplayDropDown)} />
                        <div id="dropdown" className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 ${isDisplayDropDown ? "block" : "hidden"}`}>
                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">    
                        <a href="/" key='header-home' className="block items-center ms-3" >Home</a></div>
                        {headerItems?.map(t => <SidebarItem onclick={sidebarItemClick} key={`headerMenu-${t.fields.teamNameShort}`} teamNameShort={t.fields.teamNameShort} teamNameFull={t.fields.teamNameFull} teamId={t.sys.id} />)}
                        </div>
                    </div>

                    <div className="flex-1 justify-center w-70">
                        <div className="relative justify-none">
                            <h5 className="text-lg font-semibold leading-6 text-gray-900">{header}</h5>
                        </div>
                    </div>

                </nav>
            </header>
        </>
    )
}

export default Header