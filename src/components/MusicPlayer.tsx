import golden from "../assets/golden-age.png";
import { TfiControlShuffle } from "react-icons/tfi";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import { TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { songs } from "../songs";


export default function MusicPlayer() {
  const [songIndex, setSongIndex] = useState<number>(0);
  const [songSrc, setSongSrc] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [unmute, setUnmute] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(10)
  const [tempVol, setTempVol] = useState<number>(10)
  const [progress, setProgress] = useState<number>(0)
  const audio = useRef<HTMLMediaElement>(null);

  function loadSong(songIndex: number){
    setSongSrc(songs[songIndex].music)
  }

  useEffect(()=>{
    loadSong(songIndex);
  }, [songIndex])

  function playpause() {
    !isPlaying ? playSong() : pauseSong()
  }
  
  function playSong() {
    setIsPlaying(true)

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

  function toggleVolume() {
    setUnmute(!unmute)
  }

  useEffect(()=>{
    if (unmute) {
      setVolume(tempVol)
      audio.current!.volume = tempVol / 100
    } else {
      setTempVol(volume)
      setVolume(0)
      audio.current!.volume = 0
    }
  }, [unmute])

  function handleVolume(e: FormEvent<HTMLInputElement>) {
    const currentVolume = Number(e.currentTarget.value) 
    setTempVol(currentVolume)    
    setVolume(currentVolume)
    setUnmute(true)
    audio.current!.volume = currentVolume / 100
  }

  function updateProgress(e: SyntheticEvent<HTMLAudioElement, Event>) {
    const { duration, currentTime } = e.currentTarget;
    if (isPlaying) setProgress((currentTime / duration) * 100);
  }

  function seek(musicProgress:number) {
    setProgress(musicProgress)
    audio.current!.currentTime = (musicProgress / 100) * audio.current!.duration
  }

  function hh_mm_ss(totalSeconds: number){
    return new Date(totalSeconds * 1000).toISOString().substring(14, 19)
  }

  function checkSrc() {
    if (audio.current!.currentSrc) {
      nextSong()
    }
  }

  

  
  return (
    <>
      <div className="fixed backdrop-blur bg-dark-alt/50 border-t border-white/10 w-full  bottom-0 flex justify-between items-center pl-[100px] pr-[60px] py-4 text-white/40">
        <audio ref={audio} src={songSrc} onTimeUpdate={(e) => updateProgress(e)} onError={()=>checkSrc()}></audio>

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
            <button onClick={()=>playpause()} title={isPlaying ? 'Pause' : 'Play'} className="rounded-full bg-secondary p-2 shadow-[0px_0px_18px_rgba(255,255,255,0.3)] hover:shadow-[0px_0px_18px_white]">
              { isPlaying 
                ? <FaPause  className="w-3 h-3 text-white" /> 
                : <FaPlay className="w-3 h-3 text-white" />
              }
            </button>
            <BsSkipEndFill onClick={() => nextSong()} title="Next" className="w-6 h-6 hover:text-white" />
            <TbRepeatOnce title="Repeat Song" className="w-6 h-6 hover:text-white" />
          </div>

          {/* music progress */}
          <div className="flex gap-2 items-center text-xs text-white">
            <span>{audio.current?.currentTime && hh_mm_ss(audio.current!.currentTime)}</span>
            <div className=" w-[300px]  lg:w-[500px]">
              <input type="range" onChange={(e) => seek(Number(e.currentTarget.value))} style={{ backgroundSize: `${progress}% 100%`}} value={progress} min="0" max="100" step="1" className="fr__input" />
            </div>
            <span>
              {audio.current?.duration ? hh_mm_ss(audio.current?.duration) : '00:00'}
            </span>
          </div>
        </div>

        {/* volume */}
        <div className="flex gap-2 items-center">
          {unmute 
            ? <FaVolumeUp onClick={()=>toggleVolume()} title="Mute" className="text-white" />
            : <FaVolumeOff onClick={() => toggleVolume()} title="Unmute" className="text-white" />
          }
          <div className="w-[150px] py-3">
            <input style={{ backgroundSize: `${volume}% 100%` }} onChange={(e) => handleVolume(e)} className="fr__input" type="range" value={volume} min="0" max="100" step="1" />
          </div>
        </div>
      </div>
    </>
  )
}