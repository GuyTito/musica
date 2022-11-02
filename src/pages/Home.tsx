import { useEffect, useState } from 'react';
import hug from "../assets/hug.png";
import heart from "../assets/icons/heart.svg";
import bubble from "../assets/bubble.png";
import HoleheartSVG from "../assets/icons/HoleheartSVG";
import { PlaylistType, SongData } from "../types";
import { addTimes } from '../hooks/useHooks';



export default function Home() {
  // https://musica-api.up.railway.app/playlist
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
 
  async function fetchSongs(url: string) {
    const response = await fetch(url)
    try {
      const data = await response.json()
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    fetchSongs('https://musica-api.up.railway.app/playlist')
      .then(data => setPlaylists(data))
  }, [])

  function getArtists(files: SongData[]){
    const artists: Array<string> = []
    files.forEach((file: SongData) => {
      if (!artists.includes(file.artist)) artists.push(file.artist)
    })
    return artists.join(', ').substring(0, 50)
  }


  return (
    <>
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
          <div className="space-y-3 h-[350px] overflow-y-scroll">
            {playlists.length > 0 && playlists.map((song: PlaylistType) => (
              <div key={song.id} className="flex items-center justify-between p-4 rounded-[20px] bg-dark-alt ">
                <div className="flex items-center gap-4 ">
                  <img src={song.cover} className="w-16 h-16 rounded-[10px]" alt="" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base">{song.title}</h3>
                    <span className="text-white/50 text-xs">{getArtists(song.files)}...</span>
                    {/* <span className="text-xs">{song.duration}</span> */}
                  </div>
                </div>
                <div>
                  <button className="p-[10px] rounded-full border border-light-o">
                    <HoleheartSVG />
                  </button>
                </div>
              </div>
            ))}
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
    </>
  )
}