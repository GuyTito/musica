import { useParams } from "react-router-dom"
import { useSongsContext } from "../context/SongsContext"

export default function Playlist() {
  const { id } = useParams()
  const { playlists } = useSongsContext()
  const playlist = playlists.find(playlist => playlist.id === id)
  
  return (
    <>
      {playlist ? playlist.title : `Playlist with id of "${id}" not available`}
    </>
  )
}