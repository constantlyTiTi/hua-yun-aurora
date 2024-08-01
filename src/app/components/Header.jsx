'use client'
import React,{useState,useEffect, useRef} from "react";
import { getParentTeams } from "../api/getContentful";
import SidebarItem from "./SidebarItem";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTeamPageHeaders} from '@/app/api/getContentful'

const Header = ({ settings }) => {

    const {header,iconHeaderImageUrl} = settings

    const [headerItems, setHeaderItems] = useState()

    const [headerTitles, setHeaderTitles] = useState()

    const [isDisplayDropDown, setIsDisplayDropDown] = useState(false)

    const router = useRouter()

    const dropDownRef = useRef()

    const iconRef = useRef()


    useEffect(()=>{
        getParentTeams().then(res=> setHeaderItems(JSON.parse(res).data.items)).catch(err=>console.log(err))
        getTeamPageHeaders().then(res => {

            const jsonObj = JSON.parse(res)

            jsonObj.data.items.length > 0 && setHeaderTitles(jsonObj.data.items[0].fields)

        })
    },[])

    const sidebarItemClick = (teamName) => {
        router.push(`/teams/${teamName}`)
        setIsDisplayDropDown(false)
    }

    const iconOnClick = ()=> {
        setIsDisplayDropDown(!isDisplayDropDown)
    }

    useEffect(() => {

        function handleClickOutside(event) {
          if (dropDownRef.current && !dropDownRef.current.contains(event.target) && iconRef.current && !iconRef.current.contains(event.target) ) {
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
            <header className='sticky flex flex-col flex-none top-0 z-40 bg-white relative w-full h-20 overflow-visible shadow-lg'>
                <nav className="h-25 flex justify-initial items-center justify-between py-6 lg:px-8" aria-label="Global">

                <div className = "flex-none px-6" onClick = {()=>iconOnClick()} ref={iconRef}>
                        <img className="h-8 w-auto" src={iconHeaderImageUrl} alt="website icon"  />
                        </div>

                    <div className="flex-1 justify-center w-70">
                        <div className="relative justify-none">
                            <h5 className="text-lg font-semibold leading-6 text-gray-900">{header}</h5>
                        </div>
                    </div>

                </nav>
                <div ref={dropDownRef} className={`flex flex-col flex-none top-25 ml-0 h-svh max-h-svh md:h-auto pr-5 sm:ml-6 sm:mb-2 w-full sm:w-fit overflow-y-auto z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 ${isDisplayDropDown ? "block" : "hidden"}`}>
                    <div className=" block sm:hidden flex justify-end p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg onClick = {()=>setIsDisplayDropDown(!isDisplayDropDown)} className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    <Link href="/" key='header-home'  onClick = {()=>setIsDisplayDropDown(!isDisplayDropDown)}  className="block items-center ms-3" >
                    <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> Home</div></Link>
                       
                    <Link href="/teams"  onClick = {()=>setIsDisplayDropDown(!isDisplayDropDown)} key='header-teamNews' className="block items-center ms-3" >
                    {
                        headerTitles && <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> {headerTitles.teamNewsName}</div>
                    }
                    </Link>
                    
                    {headerItems?.map(t => <SidebarItem onclick={sidebarItemClick} key={`sidebarItem-${t.sys.id}`} sysId={t.sys.id} teamNameShort={t.fields.teamNameShort} teamNameFull={t.fields.teamNameFull}/>)}

                </div>
            </header>
        </>
    )
}

export default Header