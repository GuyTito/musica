import { PlaylistType, SongData, SongsContextType, SongsProviderProps } from "../types";
import { createContext, useContext, useEffect, useState } from "react"


export const SongsContext = createContext({} as SongsContextType)

export function useSongsContext() {
  return useContext(SongsContext)
}


export default function SongsProvider({ children }: SongsProviderProps) {
  const [queue, setQueue] = useState([] as SongData[])
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [myCollections, setMyCollections] = useState<string[]>(JSON.parse(localStorage.getItem('myCollections') as string) || [])
  const [likes, setLikes] = useState<string[]>(JSON.parse(localStorage.getItem('likes') as string) || [])
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

  // https://musica-api.up.railway.app

  useEffect(() => {
    fetchSongs('https://musica-api.onrender.com/playlist')
      .then(data => setPlaylists(data))
    fetchSongs('https://musica-api.onrender.com/new')
      .then(data => setNewReleases(data))
    fetchSongs('https://musica-api.onrender.com/popular')
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

  function updateMyCollections(playlistId: string){
    if (myCollections.includes(playlistId)){
      setMyCollections(prevState => prevState.filter(id => id !== playlistId))
    } else setMyCollections(prevState => [...prevState, playlistId])
  }

  function updateLikes(songId: string){
    if (likes.includes(songId)){
      setLikes(prevState => prevState.filter(id => id !== songId))
    } else setLikes(prevState => [...prevState, songId])
  }

  useEffect(()=>{
    localStorage.setItem("myCollections", JSON.stringify(myCollections))
  }, [myCollections])

  useEffect(()=>{
    localStorage.setItem("likes", JSON.stringify(likes))
  }, [likes])

  
  return (
    <>
      <SongsContext.Provider value={{
        queue, playSong, playlists, newReleases, popular, songIndex, changeSongIndex, playSongs, isPlaying, changePlayState, updateMyCollections, myCollections, updateLikes, likes }}>
        {children}
      </SongsContext.Provider>
    </>
  )
}