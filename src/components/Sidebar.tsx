import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeSVG from "../assets/icons/HomeSVG";
import LogoutSVG from "../assets/icons/LogoutSVG";
import PlaylistSVG from "../assets/icons/PlaylistSVG";
import ProfileSVG from "../assets/icons/ProfileSVG";
import RadioSVG from "../assets/icons/RadioSVG";
import VideosSVG from "../assets/icons/VideosSVG";
import logo from "../assets/logo.png";
import { SidebarProps } from "../types";


export default function Sidebar({ setMenu }: SidebarProps) {
  const [isNavBg, setIsNavBg] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    if (location.pathname.includes('playlist')) setIsNavBg(true)
  })

  
  return (
    <>
      <nav className={`sm:mt-6 sm:mx-6 ${isNavBg || 'bg-dark'}`}>
        <div className="hidden sm:block"><img src={logo} alt="logo" /></div>
        <div className="sm:mt-10 sm:bg-dark-alt py-6 px-6 sm:px-4 rounded-full flex flex-col gap-7">
          <NavLink onClick={() => setMenu?.(false)} to="home" title="Home">
            {({ isActive }) => (
              <div className="flex gap-4 items-center">
                <HomeSVG className={isActive ? 'fill-secondary' : undefined} />
                <span className="sm:hidden">Home</span>
              </div>
            )}
          </NavLink>
          <NavLink onClick={() => setMenu?.(false)} to="collections" title="Collections">
            {({ isActive }) => (
              <div className="flex gap-3 items-center">
                <PlaylistSVG className={isActive ? 'fill-secondary' : undefined} />
                <span className="sm:hidden">Collections</span>
              </div>
            )}
          </NavLink>
          
          <div onClick={() => setMenu?.(false)} className="flex gap-3 items-center">
            <VideosSVG /> <span className="sm:hidden">Videos</span>
          </div>
          <div onClick={() => setMenu?.(false)} className="flex gap-3 items-center">
            <RadioSVG /> <span className="sm:hidden">Radios</span>
          </div>
        </div>
        <div className="sm:mt-10 sm:bg-dark-alt pb-6 sm:py-6 px-6 sm:px-4 rounded-full space-y-7">
          <div onClick={() => setMenu?.(false)} className="flex gap-3 items-center">
            <ProfileSVG /> <span className="sm:hidden">Profile</span>
          </div>
          <div onClick={() => setMenu?.(false)} className="flex gap-3 items-center">
            <LogoutSVG /> <span className="sm:hidden">Logout</span>
          </div>
        </div>
      </nav>
    </>
  )
}