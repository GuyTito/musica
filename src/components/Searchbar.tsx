import { FormEvent, useState } from "react";
import search from "../assets/icons/search.png";
import { useSongsContext } from "../context/SongsContext";
import { SongData } from "../types";
import { RiMenu2Line  } from "react-icons/ri";
import logo from "../assets/logo.png";


export default function Searchbar() {
  const [modal, setModal] = useState(false)
  const [tracks, setTracks] = useState<SongData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { playSong, newReleases, popular } = useSongsContext()

  async function searchSong(songTerm: string, songs: SongData[]){
    songs.forEach((item) => {
      if (item.artist.toLowerCase().includes(songTerm) || item.title.toLowerCase().includes(songTerm)) {
        setTracks(prevState => [...prevState, item])
      }
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTracks([])
    if (searchTerm) {
      searchSong((searchTerm.toLowerCase()), popular)
      searchSong((searchTerm.toLowerCase()), newReleases)
    }
    setModal(true)
  }

  function closeModal(){
    setSearchTerm("")
    setModal(false)
  }
  
  
  return (
    <>
      {/* search bar */}
      <div className="flex sm:block items-center gap-4">
        <RiMenu2Line className="text-2xl sm:hidden" />
        <div className="sm:hidden"><img src={logo} alt="logo" /></div>
        <form onSubmit={(e)=>handleSubmit(e)} className="pl-7 flex items-center w-full sm:w-[60%] relative">
          <img src={search} alt='search' className="mr-5 hidden sm:block" />
          <input type="text" value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="text-light bg-transparent placeholder-transparent sm:placeholder-white/25 text-sm w-full py-6 outline-none " 
            placeholder="Search songs" />
          <img src={search} alt='search' className="mr-5 sm:hidden" />
        </form>
      </div>

      {/* search result modal */}
      {modal && 
        <div className="absolute pl-20 sm:pl-32 bg-dark inset-0 top-[68px] overflow-hidden">
          <button onClick={()=>closeModal()} className="py-1 px-[10px] rounded-full border-[3px] border-secondary text-secondary absolute right-[5%]">&#x2715;</button>

          
          <div className="w-[75%] sm:w-[85%] h-[80%] overflow-y-scroll space-y-3">
            {tracks.length > 0 
              ? tracks.map(music => (
                <div key={music?.id} title="Play"
                  onClick={() => playSong(music)}  
                  className="cursor-pointer flex gap-2 items-center hover:bg-gray-500 p-1"
                >
                  <img src={music?.cover} className="w-10 h-10" alt="" />
                  <div>
                    <p className="font-bold">{music?.title}</p>
                    <p className="text-xs text-gray-300">{music?.artist}</p>
                  </div>
                  <span className="ml-auto">{music?.duration}</span>
                </div> )) 
              : <p className="font-bold text-secondary">😥 {searchTerm} not available.</p>
            }
          </div>
        </div>
      }
    </>
  )
}