import hug from "../assets/hug.png";
import heart from "../assets/icons/Heart.svg";
import HoleheartSVG from "../assets/icons/HoleheartSVG";
import { PlaylistType, SongData } from "../types";
import { convertToSeconds, hh_mm_ss, totalDuration } from '../hooks/useHooks';
import SongsSlider from '../components/SongsSlider';
import { useSongsContext } from '../context/SongsContext';
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate()
  const { playlists, newReleases, popular } = useSongsContext()

  function displayArtists(files: SongData[]){
    const artists: Array<string> = []
    files.forEach((file: SongData) => {
      if (!artists.includes(file.artist)) artists.push(file.artist)
    })
    return artists.join(', ').substring(0, 50)
  }


  return (
    <>
      <div className="flex gap-5">
        {/* hero  section */}
        <div className="bg-[#609EAF] w-[60%] py-7  px-10 rounded-[40px] ">
          <span className="text-xs">Currated playlist</span>
          <div className="my-20 space-y-2">
            <h1 className="font-bold text-4xl">R & B Hits</h1>
            <p className="text-sm w-[276px]">All mine, Lie again, Petty call me everyday,
              Out of time, No love, Bad habit,
              and so much more
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <img src={hug} alt="hug" />
            <img src={heart} alt="heart" />
            <span className="text-sm">33k Likes</span>
          </div>
        </div>

        {/* top charts */}
        <div className=" w-[40%]">
          <h2 className="mb-[14px] text-2xl font-bold">Top Charts</h2>
          <div className="space-y-3 h-[350px] overflow-y-scroll">
            {playlists.length > 0 && playlists.map((song: PlaylistType) => (
              <div onClick={() => navigate(`playlist/${song.id}`)} key={song.id} className="flex items-center justify-between p-4 rounded-[20px] bg-dark-alt cursor-pointer">
                <div className="flex items-center gap-4 ">
                  <img src={song.cover} className="w-16 h-16 rounded-[10px]" alt="" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base">{song.title}</h3>
                    <span className="text-white/50 text-xs">{displayArtists(song.files)}...</span>
                    <span className="text-xs">{totalDuration(song.files)}</span>
                  </div>
                </div>
                <div>
                  <button className="p-[10px] rounded-full border border-light-o">
                    <HoleheartSVG />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* new releases */}
      <SongsSlider title='New releases' songs={newReleases} />

      {/* popular */}
      <SongsSlider title='Popular in your area' songs={popular} />
    </>
  )
}