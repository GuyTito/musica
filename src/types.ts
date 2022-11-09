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
  songIndex: number
  changeSongIndex: (index: number) => void
  playSongs: (songs: SongData[], index?: number) => void
  changePlayState: (playState: boolean) => void
  isPlaying: boolean
  updateMyCollections: (playlistId: string) => void
  myCollections: string[]
  updateLikes: (songId: string) => void
  likes: string[]
}

export interface PlaylistType{
  id: string
  title: string
  cover: string
  info: string
  files: SongData[]
}
