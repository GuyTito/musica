import { TfiControlShuffle } from "react-icons/tfi";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import { TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";
import { MouseEvent, FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { RepeatOptions } from "../types";
import { getRandomNum, hh_mm_ss } from "../hooks/useHooks";
import { useSongsContext } from "../context/SongsContext";


export default function MusicPlayer() {
  const [songSrc, setSongSrc] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [coverImg, setCoverImg] = useState<string>("");
  const [volume, setVolume] = useState<number>(Number(localStorage.getItem('volume') || "") || 50)
  const [unmute, setUnmute] = useState<boolean>(Boolean(volume) || false)
  const [tempVol, setTempVol] = useState<number>(volume)
  const [progress, setProgress] = useState<number>(0)
  const [repeat, setRepeat] = useState<RepeatOptions>(((localStorage.getItem('repeat') || "") || 'ENABLED') as RepeatOptions)
  const [seekTime, setSeekTime] = useState('0')
  const [shuffled, setShuffled] = useState(false)
  const [randomIndex, setRandomIndex] = useState(0)
  const audio = useRef<HTMLMediaElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const { queue, songIndex, isPlaying, changePlayState, changeSongIndex } = useSongsContext()

  function loadSong(songIndex: number){
    setSongSrc(queue[songIndex]?.audio)
    setSongTitle(queue[songIndex]?.title)
    setArtist(queue[songIndex]?.artist)
    setCoverImg(queue[songIndex]?.cover)
  }

  useEffect(()=>{
    loadSong(songIndex);
    playSong();
  }, [songIndex])

  useEffect(()=>{
    loadSong(songIndex)
    playSong();
  }, [queue])

  useEffect(()=>{
    if (isPlaying){
      playSong()
    } else{
      audio.current?.pause()
    }
  }, [isPlaying])
  
  function playSong(){
    changePlayState(true)
    setTimeout(function () {
      audio.current?.play();
    }, 150);
  }

  function nextSong() {
    if (shuffled) {
      const randomNum = getRandomNum((queue.length - 1))
      setRandomIndex(randomNum)
      loadSong(randomIndex)
      playSong()
    } else {
      if (songIndex === (queue.length - 1)) changeSongIndex(0)
      else changeSongIndex(songIndex + 1)
      playSong()
    }
  }

  function prevSong() {
    if (shuffled) {
      loadSong(randomIndex)
      playSong()
    } else {
      if (songIndex === 0) changeSongIndex(queue.length - 1)
      else changeSongIndex(songIndex - 1)
      playSong()
    }
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
    audio.current!.volume = currentVolume / 100
  }

  useEffect(() => {
    volume ? setUnmute(true) : setUnmute(false)
    localStorage.setItem("volume", String(volume));
  }, [volume])

  function updateProgress(e: SyntheticEvent<HTMLAudioElement, Event>) {
    const { duration, currentTime } = e.currentTarget;
    if (isPlaying) setProgress((currentTime / duration) * 100);
  }

  function seek(musicProgress:number) {
    setProgress(musicProgress)
    audio.current!.currentTime = (musicProgress / 100) * audio.current!.duration
  }

  function checkSrc() {
    if (audio.current!.currentSrc) {
      changePlayState(false)
      setProgress(0)
      alert("Audio not available for current song.")
      nextSong()
    }
  }

  function repeatSong(){
    setRepeat('ONE')
    audio.current!.loop = true
  }

  function handleSongEnded() {
    if (repeat === 'ENABLED') nextSong()
    if (repeat === 'DISABLED') changePlayState(false)
  }

  useEffect(() => {
    localStorage.setItem("repeat", repeat);
  }, [repeat])

  function showSeekTime(e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
    const width = progressBar.current!.clientWidth
    const clickX = e.nativeEvent.offsetX
    const time = hh_mm_ss((clickX / width) * audio.current!.duration)
    setSeekTime(time)
  }
  

  
  return (
    <>
      <div className="fixed backdrop-blur bg-dark-alt/50 border-t border-white/10 w-full  bottom-0 flex justify-between items-center pl-[100px] pr-[60px] py-4 text-white/40">
        <audio ref={audio} src={songSrc} 
          onTimeUpdate={(e) => updateProgress(e)} 
          onError={()=>checkSrc()} 
          onEnded={()=>handleSongEnded()}>
        </audio>

        {/* cover image */}
        <div className="flex items-center gap-3">
          <img src={coverImg} className="w-12 h-12 rounded-[14px]" alt="song image" />
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-sm">{songTitle}</h3>
            <span className="font-bold text-[10px] text-xs">{artist}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center">
          {/* music controls */}
          <div className="flex gap-10">
            {/* shuffle button */}
            <TfiControlShuffle onClick={() => setShuffled(!shuffled)} 
              title={shuffled ? "Disable Shuffle" : 'Shuffle'} 
              className={`w-6 h-6 ${shuffled && 'text-secondary'}`} 
            />
            {/* previous button */}
            <BsSkipStartFill onClick={() => prevSong()} title="Previous" className="w-6 h-6 hover:text-white" />
            {/* play button */}
            <button onClick={() => changePlayState(!isPlaying)} className="rounded-full bg-secondary shadow-[0px_0px_18px_rgba(255,255,255,0.3)] hover:shadow-[0px_0px_18px_white]">
              { isPlaying 
                ? <FaPause   className="w-3 h-3 text-white m-2" title='Pause' /> 
                : <FaPlay className="w-3 h-3 text-white m-2" title='Play' />
              }
            </button>
            {/* next song */}
            <BsSkipEndFill onClick={() => nextSong()} title="Next" className="w-6 h-6 hover:text-white" />
            
            {/* repeat button */}
            {repeat === 'DISABLED' && 
              <TbRepeat title="Enable repeat" className="w-6 h-6" onClick={() => setRepeat('ENABLED')} />}
            {repeat === 'ENABLED' && 
              <TbRepeat title="Repeat current song" className="w-6 h-6 text-secondary" onClick={() => repeatSong()} />}
            {repeat === 'ONE' && 
              <TbRepeatOnce title="Disable repeat" className="w-6 h-6 text-secondary" onClick={() => setRepeat('DISABLED')} />}
          </div>

          {/* music progress */}
          <div className="relative flex gap-2 items-center text-xs text-white">
            <span className="absolute -left-9">
              {audio.current?.currentTime 
                ? hh_mm_ss(audio.current!.currentTime) 
                : '0:00'}
            </span>
            <div className=" w-[300px] lg:w-[500px]">
              <input ref={progressBar} type="range" title={seekTime}
                onChange={(e) => seek(Number(e.currentTarget.value))} 
                onMouseMove={(e)=>showSeekTime(e)}
                style={{ backgroundSize: `${progress}% 100%`}} value={progress} 
                min="0" max="100" step="1" className="fr__input" 
              />
            </div>
            <span>
              {audio.current?.duration 
                ? hh_mm_ss(audio.current?.duration) 
                : '00:00'}
            </span>
          </div>
        </div>

        {/* volume */}
        <div className="flex gap-2 items-center">
          {unmute 
            ? <FaVolumeUp onClick={()=>setUnmute(!unmute)} title="Mute" className="text-white" />
            : <FaVolumeOff onClick={() => setUnmute(!unmute)} title="Unmute" className="text-white" />
          }
          <div className="w-[150px] py-3">
            <input type="range" 
              style={{ backgroundSize: `${volume}% 100%` }} 
              onChange={(e) => handleVolume(e)} 
              value={volume} min="0" max="100" step="1" className="fr__input" 
            />
          </div>
        </div>
      </div>
    </>
  )
}