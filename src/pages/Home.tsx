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
import golden from "../assets/golden-age.png";
import bubble from "../assets/bubble.png";
import HoleheartSVG from "../assets/icons/HoleheartSVG";
import { TfiControlShuffle } from "react-icons/tfi";
import { FaPlay, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import { TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";


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

        <div className="ml-6 w-full mb-5 mr-[60px]">
          {/* search bar */}
          <form className=" pl-7 flex items-center w-[60%]">
            <img src={search} alt='search' className="mr-5" />
            <input type="text" className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" placeholder="Search tracks, artists..." />
          </form>

          <div className="flex gap-5">
            {/* hero  section */}
            <div className="bg-[#609EAF] w-[60%] py-7  px-10 rounded-[40px] ">
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

            {/* top charts */}
            <div className=" w-[40%]">
              <h2 className="mb-[14px] text-2xl font-bold">Top Charts</h2>
              <div className="space-y-3 ">
                <div className="flex items-center justify-between p-4 rounded-[20px] bg-dark-alt ">
                  <div className="flex items-center gap-4 ">
                    <img src={golden} className="rounded-[10px]" alt="" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base">Golden age of 80s</h3>
                      <span className="text-white/50 text-xs">Sean Swadder</span>
                      <span className="text-xs">2:34:45</span>
                    </div>
                  </div>
                  <div>
                    <button className="p-[10px] rounded-full border border-light-o">
                      <HoleheartSVG />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* new releases */}
          <div className="mt-10">
            <h2 className="mb-3 font-bold text-2xl">New releases</h2>
            <div>
              <div>
                <img src={bubble} className="rounded-3xl" alt="" />
                <span className="text-xs">Life in a bubble</span>
              </div>
            </div>
          </div>
        </div>

        {/* music player */}
        <div className="fixed backdrop-blur bg-dark-alt/50 border-t border-white/10 w-full  bottom-0 flex justify-between items-center pl-[100px] pr-[60px] py-6">
          {/* cover image */}
          <div className="flex items-center gap-3">
            <img src={golden} className="w-12 h-12 rounded-[14px]" alt="" />
            <div className="flex flex-col">
              <h3 className="font-bold text-sm">Seasons in</h3>
              <span className="font-bold text-[10px] text-xs  text-white/40">James</span>
            </div>
          </div>

          {/* music controls */}
          <div className="flex flex-col gap-8 items-center">
            <div className="flex gap-10">
              <TfiControlShuffle className="w-6 h-6" />
              <BsSkipStartFill className="w-6 h-6" />
              <button className="rounded-full bg-secondary p-2 shadow-[0px_0px_18px_rgba(255,255,255,0.3)]">
                <FaPlay className="w-3 h-3" />
              </button>
              <BsSkipEndFill className="w-6 h-6" />
              <TbRepeatOnce className="w-6 h-6" />
            </div>
            <div className="w-[600px] h-[2px] rounded bg-white/10 flex items-center">
              <div className="bg-secondary w-1/2 h-[2px] rounded-l"></div>
              <div className="p-[2px] bg-transparent rounded-full border-white border">
                <div className="bg-secondary h-2 w-2 rounded-full "></div>
              </div>
            </div>
          </div>

          {/* volume */}
          <div className="flex gap-2 items-center">
            <FaVolumeUp />
            <div className="w-[150px] h-[2px] rounded bg-white/10 flex items-center">
              <div className="bg-secondary w-1/2 h-[2px] rounded-l"></div>
              <div className="p-[2px] bg-transparent rounded-full border-white border">
                <div className="bg-secondary h-2 w-2 rounded-full "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}