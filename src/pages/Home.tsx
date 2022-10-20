import HomeSVG from "../assets/icons/HomeSVG";
import LogoutSVG from "../assets/icons/LogoutSVG";
import PlaylistSVG from "../assets/icons/PlaylistSVG";
import ProfileSVG from "../assets/icons/ProfileSVG";
import RadioSVG from "../assets/icons/RadioSVG";
import VideosSVG from "../assets/icons/VideosSVG";
import logo from "../assets/logo.png";
import search from "../assets/icons/search.png";
import hug from "../assets/hug.png";
import heart from "../assets/icons/heart.svg";


export default function Home() {
  
  
  return (
    <>
      <div className="flex">
        {/* sidebar */}
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
          {/* topnav */}
          <form className=" pl-7 flex items-center">
            <img src={search} alt='search' className="mr-5" />
            <input type="text" className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" placeholder="Search tracks, artists..." />
          </form>

          <div>
            {/* hero  section */}
            <div className="bg-[#609EAF] w-[686px] py-7  px-10 rounded-[40px] ">
              <span className="text-xs">Currated playlist</span>
              <div className="my-20 space-y-2">
                <h1 className="font-bold text-4xl">R & B Hits</h1>
                <p className="text-sm w-[276px]">All mine, Lie again, Petty call me everyday,
                  Out of time, No love, Bad habit,
                  and so much more
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <img src={hug} alt="hug" />
                <img src={heart} alt="heart" />
                <span className="text-sm">33k Likes</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}