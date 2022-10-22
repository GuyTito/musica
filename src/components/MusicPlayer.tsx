
import golden from "../assets/golden-age.png";
import { TfiControlShuffle } from "react-icons/tfi";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import { TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { songs } from "../songs";


export default function MusicPlayer() {
  const [songIndex, setSongIndex] = useState<number>(0);
  const [songSrc, setSongSrc] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audio = useRef<HTMLMediaElement>(null);

  function loadSong(songIndex: number){
    setSongSrc(songs[songIndex].music)
  }

  function playpause() {
    !isPlaying ? playSong() : pauseSong()
  }
  
  function playSong() {
    setIsPlaying(true)
    audio.current!.volume = 0.1;
    setTimeout(function () {
      audio.current?.play();
    }, 150);
  }

  function pauseSong(){
    setIsPlaying(false)
    audio.current?.pause()
  }

  function nextSong() {
    if (songIndex === (songs.length - 1)) setSongIndex(0)
    else setSongIndex(songIndex + 1)
    loadSong(songIndex)
    playSong();
  }

  function prevSong() {
    if (songIndex === 0) setSongIndex(songs.length - 1)
    else setSongIndex(songIndex - 1)
    loadSong(songIndex);
    playSong();
  }

  useEffect(()=>{
    loadSong(songIndex);    
  }, [songIndex])

  
  return (
    <>
      <div className="fixed backdrop-blur bg-dark-alt/50 border-t border-white/10 w-full  bottom-0 flex justify-between items-center pl-[100px] pr-[60px] py-4 text-white/40">
        <audio src={songSrc} ref={audio}></audio>
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
            <TfiControlShuffle title="Shuffle" className="w-6 h-6 hover:text-white" />
            <BsSkipStartFill onClick={() => prevSong()} title="Previous" className="w-6 h-6 hover:text-white" />
            <button onClick={()=>playpause()} className="rounded-full bg-secondary p-2 shadow-[0px_0px_18px_rgba(255,255,255,0.3)] hover:shadow-[0px_0px_18px_white]">
              { isPlaying 
                ? <FaPause  className="w-3 h-3 text-white" /> 
                : <FaPlay className="w-3 h-3 text-white" />
              }
            </button>
            <BsSkipEndFill onClick={() => nextSong()} title="Next" className="w-6 h-6 hover:text-white" />
            <TbRepeatOnce title="Repeat Song" className="w-6 h-6 hover:text-white" />
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