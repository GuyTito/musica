import { FaHeart, FaPlay } from "react-icons/fa"
import { useParams } from "react-router-dom"
import HoleheartSVG from "../assets/icons/HoleheartSVG"
import { useSongsContext } from "../context/SongsContext"
import { totalDuration } from "../hooks/useHooks"
import { PlaylistType } from "../types"
import addtocol  from "../assets/icons/music-square-add.png"
import { useEffect } from "react"

export default function Playlist() {
  const { id } = useParams()
  const { playlists } = useSongsContext()
  const playlist = playlists.find(playlist => playlist.id === id) as PlaylistType 

  useEffect(() => {
    // 👇️ set style on body element
    document.body.style.background = 'center/cover fixed no-repeat';
    document.body.style.backgroundPosition = '50% 20%';
    document.body.style.backgroundImage = `linear-gradient(rgba(29, 33, 35, 0.9), rgba(29, 33, 35, 0.99)), url(${playlist.cover})`;

    return () => {
      // 👇️ optionally remove styles when component unmounts
      document.body.style.backgroundImage = '';
      document.body.style.background = '';
      document.body.classList.add('bg-dark');
    };
  }, []);
  
  return (
    <>
      {playlist ?  
        <div>
          {/* header */}
          <div className="flex gap-10">
            <img src={playlist?.cover} className="object-cover object-top w-[284px] h-[288px] rounded-[35px] " alt="" />
            <div className="grid">
              <div className="self-center mt-14 space-y-3">
                <h1 className="text-primary font-bold text-4xl">{playlist?.title}</h1>
                <p className="text-sm w-[527px]">{playlist?.info}</p>
                <div className="text-sm">
                  <span>{playlist?.files.length} songs</span> ~ <span>{ totalDuration(playlist.files)} min</span>
                </div>
              </div>
              <div className="flex gap-5 items-center self-end mb-2">
                <button className="flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 active:bg-white/5 hover:bg-white/20">
                  <button className="flex justify-center items-center w-3 h-3 rounded-full bg-secondary">
                    <FaPlay className="w-3 h-3 m-1 text-black" />
                  </button>
                  <span>Play all</span>
                </button>
                <button className="flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 active:bg-white/5 hover:bg-white/20">
                  <img src={addtocol} alt="" />
                  <span>Add to collection</span>
                </button>
                <button className="flex justify-center items-center rounded-full bg-white/10 hover:bg-white/20"><FaHeart className="m-2 text-red-500 " /></button>
              </div>
            </div>
          </div>

          {/* songs */}
          <div className="mt-12 space-y-3">
            {playlist.files.map(song => (
              <div key={song.id} className="flex justify-between items-center bg-white/10 rounded-lg p-2 hover:bg-white/20" title="Play">
                <div className="flex gap-5 items-center">
                  <img src={song.cover} className="w-10 h-10 rounded-lg" alt="" />
                  <button><HoleheartSVG /></button>
                </div>
                <span>{song.title}</span>
                <span className="mr-10">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
        : `Playlist with id of "${id}" not available`}
    </>
  )
}
