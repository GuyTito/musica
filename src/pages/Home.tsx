import HomeSVG from "../assets/icons/HomeSVG";
import LogoutSVG from "../assets/icons/LogoutSVG";
import PlaylistSVG from "../assets/icons/PlaylistSVG";
import ProfileSVG from "../assets/icons/ProfileSVG";
import RadioSVG from "../assets/icons/RadioSVG";
import VideosSVG from "../assets/icons/VideosSVG";
import logo from "../assets/logo.png";
import search from "../assets/icons/search.png";


export default function Home() {
  
  
  return (
    <>
      <div className="flex">
        <nav className="mt-6 ml-6">
          <div><img src={logo} alt="logo" /></div>
            <div className="mt-10 bg-dark-alt py-6 px-4 rounded-full space-y-7">
              <HomeSVG />
              <PlaylistSVG />
              <VideosSVG />
              <RadioSVG />
            </div>
            <div className="mt-10 bg-dark-alt py-6 px-4 rounded-full space-y-7">
              <ProfileSVG />
              <LogoutSVG />
            </div>
        </nav>
        <div className="ml-6 w-full">
          <form className=" pl-7 flex items-center">
            <img src={search} alt='search' className="mr-5" />
            <input type="text" className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" placeholder="Search tracks, artists..." />
          </form>
        </div>
      </div>
    </>
  )
}