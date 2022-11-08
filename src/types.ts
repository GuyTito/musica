export interface IconProps {
  className?: string
}
export interface SongsSliderProps {
  songs: SongData[]
  title: string
}

export type RepeatOptions = 'ONE' | 'ENABLED' | 'DISABLED'

export interface SongData {
  id: string
  artist: string
  title: string
  audio: string
  duration: string
  cover: string
}

export interface SongsProviderProps {
  children: JSX.Element
}

export interface SongsContextType {
  queue: SongData[]
  playSong: (song: SongData)=> void
  playlists: PlaylistType[]
  newReleases: SongData[]
  popular: SongData[]
  contextSongIndex: number
  playSongs: (songs: SongData[], index?: number) => void
  changePlayState: (playState: boolean) => void
  isPlaying: boolean
}

export interface PlaylistType{
  id: string
  title: string
  cover: string
  info: string
  files: SongData[]
}
