import { FaHeart } from "react-icons/fa"
import { useParams } from "react-router-dom"
import HoleheartSVG from "../assets/icons/HoleheartSVG"
import { useSongsContext } from "../context/SongsContext"
import { totalDuration } from "../hooks/useHooks"
import { PlaylistType } from "../types"

export default function Playlist() {
  const { id } = useParams()
  const { playlists } = useSongsContext()
  const playlist = playlists.find(playlist => playlist.id === id) as PlaylistType 
  
  return (
    <>
      {/* {playlist ? playlist.title : `Playlist with id of "${id}" not available`} */}
      <div>
        {/* header */}
        <div>
          <img src={playlist?.cover} className="" alt="" />
          <div>
            <h1>{playlist?.title}</h1>
            <p>{playlist?.info}</p>
            <div>
              <span>{playlist?.files.length} songs</span> - <span>{ totalDuration(playlist.files)}</span>
            </div>
            <div>
              <button>Play all</button>
              <button>Add to collection</button>
              <button className="text-red-500"><FaHeart /></button>
            </div>
          </div>
        </div>

        {/* songs */}
        <div>
          {playlist.files.map(song => (
            <div key={song.id}>
              <img src={song.cover} alt="" />
              <button><HoleheartSVG /></button>
              <span>{song.title}</span>
              <span>{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
