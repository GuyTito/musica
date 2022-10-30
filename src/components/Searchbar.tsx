import { FormEvent, useState } from "react";
import search from "../assets/icons/search.png";
import loading from "../assets/loading.png";
import { SongType } from "../types";


export default function Searchbar() {
  const [modal, setModal] = useState(false)
  const [song, setSong] = useState<SongType>({} as SongType)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };

  async function searchSong(searchTerm: string){
    setIsLoading(true)
    const response = await fetch(`https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud?track=${searchTerm}`, options)
    try {
      const data = await response.json()
      setIsLoading(false)
      setSong({
        artist: data.spotifyTrack?.artists[0]?.name,
        title: data.spotifyTrack?.name,
        audio: data.soundcloudTrack?.audio[0]?.url,
        duration: data.soundcloudTrack?.audio[0]?.durationText,
        cover: data.spotifyTrack?.album?.cover[0]?.url
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (searchTerm) searchSong(searchTerm)
    setModal(true)
  }

  function closeModal(){
    setSearchTerm("")
    setModal(false)
  }
  
  
  return (
    <>
      {/* search bar */}
      <form onSubmit={(e)=>handleSubmit(e)} className=" pl-7 flex items-center w-[60%]">
        <img src={search} alt='search' className="mr-5" />
        <input type="text" value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" 
          placeholder="Search songs" />
      </form>

      {/* search result modal */}
      {modal && 
        <div className="absolute pl-32 bg-dark inset-0 top-[68px]">
          <button onClick={()=>closeModal()} className="py-1 px-[10px] rounded-full border-[3px] border-secondary text-secondary absolute right-20">&#x2715;</button>

          {!isLoading ?
            <div className="flex gap-3 hover:bg-gray-500 w-fit p-2 rounded-2xl cursor-pointer">
              <img src={song?.cover} className="w-40 h-40 rounded-[14px]" alt="" />
              <div>
                <p className="text-3xl font-bold">{song?.title}</p>
                <p className="text-gray-300">{song?.artist}</p>
              </div>
            </div>
            : <img src={loading} alt="" />
          }
        </div>
      }
    </>
  )
}