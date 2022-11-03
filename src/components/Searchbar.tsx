import { FormEvent, useState } from "react";
import search from "../assets/icons/search.png";
import loading from "../assets/loading.png";
import { useSongsContext } from "../context/SongsContext";
import { SongData, TracksData } from "../types";


export default function Searchbar() {
  const [modal, setModal] = useState(false)
  const [tracks, setTracks] = useState<TracksData>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { playSong } = useSongsContext()


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };

  async function getSong(songTerm: string){
    setIsLoading(true)
    const response = await fetch(`https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud?track=${songTerm}`, options)
    try {
      const data = await response.json()
      setIsLoading(false)
      const song: SongData = {
        id: data.spotifyTrack?.id,
        artist: data.spotifyTrack?.artists[0]?.name,
        title: data.spotifyTrack?.name,
        audio: data.soundcloudTrack?.audio[0]?.url,
        duration: data.soundcloudTrack?.audio[0]?.durationText,
        cover: data.spotifyTrack?.album?.cover[0]?.url
      }
      playSong(song)
      closeModal()
    } catch (error) {
      console.log('error', error)
    }
  }

  async function searchSong(songTerm: string){
    setIsLoading(true)
    const response = await fetch(`https://spotify-scraper.p.rapidapi.com/v1/search?term=${songTerm}`, options)
    try {
      const data = await response.json()
      setIsLoading(false)
      setTracks(data?.tracks?.items)     
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
        <div className="absolute pl-32 bg-dark inset-0 top-[68px] overflow-hidden">
          <button onClick={()=>closeModal()} className="py-1 px-[10px] rounded-full border-[3px] border-secondary text-secondary absolute right-[5%]">&#x2715;</button>

          {!isLoading ?
            <div className="w-[85%] h-[80%] overflow-y-scroll space-y-3">
              {tracks.length > 0 && tracks.map(music => (
                <div key={music?.id} title="Play"
                  onClick={()=>getSong(`${music?.name} ${music?.artists[0]?.name}`)}  
                  className="cursor-pointer flex gap-2 items-center hover:bg-gray-500 p-1"
                >
                  <img src={music?.album?.cover[0]?.url} className="w-10 h-10" alt="" />
                  <div>
                    <p className="font-bold">{music?.name}</p>
                    <p className="text-xs text-gray-300">{music?.artists[0]?.name}</p>
                  </div>
                  <span className="ml-auto">{music?.durationText}</span>
                </div>

              )) }
            </div>
            : <img src={loading} alt="" />
          }
        </div>
      }
    </>
  )
}