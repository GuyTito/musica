import { NavLink } from "react-router-dom";
import HomeSVG from "../assets/icons/HomeSVG";
import LogoutSVG from "../assets/icons/LogoutSVG";
import PlaylistSVG from "../assets/icons/PlaylistSVG";
import ProfileSVG from "../assets/icons/ProfileSVG";
import RadioSVG from "../assets/icons/RadioSVG";
import VideosSVG from "../assets/icons/VideosSVG";
import logo from "../assets/logo.png";


export default function Sidebar() {
  
  
  return (
    <>
      <nav className="mt-6 ml-6">
        <div><img src={logo} alt="logo" /></div>
        <div className="mt-10 bg-dark-alt py-6 px-4 rounded-full space-y-7">
          <NavLink to="/">
            {({ isActive }) => (
              <HomeSVG className={isActive ? 'fill-secondary' : undefined} />
            )}
          </NavLink>
          <PlaylistSVG />
          <VideosSVG />
          <RadioSVG />
        </div>
        <div className="mt-10 bg-dark-alt py-6 px-4 rounded-full space-y-7">
          <ProfileSVG />
          <LogoutSVG />
        </div>
      </nav>
    </>
  )
}