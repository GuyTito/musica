export interface IconProps {
  className?: string
}

export type RepeatOptions = 'ONE' | 'ENABLED' | 'DISABLED'

export interface SongData {
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
