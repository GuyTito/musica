import { SongData, SongsSliderProps } from "../types";

export default function SongsSlider({songs, title}: SongsSliderProps) {
  
  
  return (
    <>
      <div className="mt-10">
        <h2 className="mb-3 font-bold text-2xl">{title}</h2>
        <div className='flex items-center overflow-x-scroll gap-7 py-2'>
          {songs.length > 0 && songs.map((song: SongData) => (
            <div key={song.id} className="flex-shrink-0 flex flex-col gap-1">
              <img src={song.cover} className="rounded-3xl w-[153px] h-[153px]" alt="" />
              <span>{song.title}</span>
              <span className="text-white/50 text-xs">{song.artist}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}