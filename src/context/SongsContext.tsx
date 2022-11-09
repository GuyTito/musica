import { PlaylistType, SongData, SongsContextType, SongsProviderProps } from "../types";
import { createContext, useContext, useEffect, useState } from "react"


export const SongsContext = createContext({} as SongsContextType)

export function useSongsContext() {
  return useContext(SongsContext)
}


export default function SongsProvider({ children }: SongsProviderProps) {
  const [queue, setQueue] = useState([] as SongData[])
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [myCollections, setMyCollections] = useState<string[]>([])
  const [newReleases, setNewReleases] = useState<SongData[]>([])
  const [popular, setPopular] = useState<SongData[]>([])
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);


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
    setSongIndex(0)
  }

  function changeSongIndex(index: number){
    setSongIndex(index)
  }

  function playSongs(songs: SongData[], index: number = 0){
    if (queue === songs){
      changeSongIndex(index)
    } else {
      setQueue(songs)
      changeSongIndex(index)
    }
  }

  function changePlayState(playState: boolean){
    setIsPlaying(playState)
  }

  function changeMyCollections(playlistId: string){
    setMyCollections(prevState => [...prevState, playlistId])
  }

  
  return (
    <>
      <SongsContext.Provider value={{
        queue, playSong, playlists, newReleases, popular, songIndex, changeSongIndex, playSongs, isPlaying, changePlayState, changeMyCollections, myCollections }}>
        {children}
      </SongsContext.Provider>
    </>
  )
}