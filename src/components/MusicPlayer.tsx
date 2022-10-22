
import golden from "../assets/golden-age.png";
import { TfiControlShuffle } from "react-icons/tfi";
import { FaPlay, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import { TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";


export default function MusicPlayer() {
  
  
  return (
    <>
      <div className="fixed backdrop-blur bg-dark-alt/50 border-t border-white/10 w-full  bottom-0 flex justify-between items-center pl-[100px] pr-[60px] py-4 text-white/40">
        {/* cover image */}
        <div className="flex items-center gap-3">
          <img src={golden} className="w-12 h-12 rounded-[14px]" alt="" />
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-sm">Seasons in</h3>
            <span className="font-bold text-[10px] text-xs">James</span>
          </div>
        </div>

        {/* music controls */}
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-10">
            <TfiControlShuffle className="w-6 h-6 hover:text-white" />
            <BsSkipStartFill className="w-6 h-6 hover:text-white" />
            <button className="rounded-full bg-secondary p-2 shadow-[0px_0px_18px_rgba(255,255,255,0.3)] hover:shadow-[0px_0px_18px_white]">
              <FaPlay className="w-3 h-3 text-white" />
            </button>
            <BsSkipEndFill className="w-6 h-6 hover:text-white" />
            <TbRepeatOnce className="w-6 h-6 hover:text-white" />
          </div>
          <div className="group py-3">
            <div className=" w-[600px] h-[2px] rounded bg-white/10 flex items-center">
              <div className="bg-white group-hover:bg-secondary w-[20%] h-[2px] rounded"></div>
              <div className="hidden group-hover:block -ml-1 p-[2px] bg-transparent rounded-full border-white border">
                <div className="bg-secondary h-2 w-2 rounded-full "></div>
              </div>
            </div>
          </div>
        </div>

        {/* volume */}
        <div className="flex gap-2 items-center">
          <FaVolumeUp className="text-white" />
          <div className="group py-3">
            <div className="w-[150px] h-[2px] rounded bg-white/10 flex items-center">
              <div className="bg-white group-hover:bg-secondary w-[10%] h-[2px] rounded-l"></div>
              <div className="hidden group-hover:block -ml-2 p-[2px] bg-transparent rounded-full border-white border">
                <div className="bg-secondary h-2 w-2 rounded-full "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}