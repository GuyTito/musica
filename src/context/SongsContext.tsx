import { SongData, SongsContextType, SongsProviderProps } from "../types";
import { createContext, useContext, useState } from "react"


export const SongsContext = createContext({} as SongsContextType)

export function useSongsContext() {
  return useContext(SongsContext)
}


export default function SongsProvider({ children }: SongsProviderProps) {
  const [songs, setSongs] = useState([] as SongData[])

  function playSong(song: SongData){
    setSongs([song])
  }
  
  return (
    <>
      <SongsContext.Provider value={{ songs, playSong }}>
        {children}
      </SongsContext.Provider>
    </>
  )
}