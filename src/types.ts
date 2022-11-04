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

export type TracksData = Array<{
  album: {
    cover: Array<{
      url: string
    }>
  }
  artists: Array<{
    name: string
  }>
  id: string
  name: string
  durationText: string
}>

export interface SongsProviderProps {
  children: JSX.Element
}

export interface SongsContextType {
  songs: SongData[]
  playSong: (song: SongData)=> void
  playlists: PlaylistType[]
  newReleases: SongData[]
  popular: SongData[]
  contextSongIndex: number
  playSongs: (songs: SongData[], index: number) => void
}

export interface PlaylistType{
  id: string
  title: string
  cover: string
  info: string
  files: SongData[]
}
