import { PlaylistType, SongData, SongsContextType, SongsProviderProps } from "../types";
import { createContext, useContext, useEffect, useState } from "react"


export const SongsContext = createContext({} as SongsContextType)

export function useSongsContext() {
  return useContext(SongsContext)
}


export default function SongsProvider({ children }: SongsProviderProps) {
  const [queue, setQueue] = useState([] as SongData[])
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [newReleases, setNewReleases] = useState<SongData[]>([])
  const [popular, setPopular] = useState<SongData[]>([])
  const [contextSongIndex, setContextSongIndex] = useState(0)

  async function fetchSongs(url: string) {
    const response = await fetch(url)
    try {
      const data = await response.json()
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchSongs('https://musica-api.up.railway.app/playlist')
      .then(data => setPlaylists(data))
    fetchSongs('https://musica-api.up.railway.app/new')
      .then(data => setNewReleases(data))
    fetchSongs('https://musica-api.up.railway.app/popular')
      .then(data => setPopular(data))
  }, [])

  function playSong(song: SongData){
    setQueue([song])
    setContextSongIndex(0)
  }

  function playSongs(songs: SongData[], index: number){
    setQueue(songs)
    setContextSongIndex(index)
  }

  
  return (
    <>
      <SongsContext.Provider value={{
        queue, playSong, playlists, newReleases, popular, contextSongIndex, playSongs }}>
        {children}
      </SongsContext.Provider>
    </>
  )
}