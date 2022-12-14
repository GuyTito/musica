import hug from "../assets/hug.png";
import heart from "../assets/icons/Heart.svg";
import { PlaylistType, SongData } from "../types";
import { totalDuration } from '../hooks/useHooks';
import SongsSlider from '../components/SongsSlider';
import { useSongsContext } from '../context/SongsContext';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";


export default function Home() {
  const navigate = useNavigate()
  const { playlists, newReleases, popular, updateLikes, likes } = useSongsContext()

  function displayArtists(files: SongData[]){
    const artists: Array<string> = []
    files.forEach((file: SongData) => {
      if (!artists.includes(file.artist)) artists.push(file.artist)
    })
    return artists.join(', ').substring(0, 50)
  }

  return (
    <>
      <div className="flex gap-5 flex-col sm:flex-row">
        {/* hero  section */}
        <div className="bg-[#609EAF] sm:w-[60%] py-7  px-10 rounded-[40px] ">
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
        <div className="mt-12 sm:mt-0 sm:w-[40%]">
          <h2 className="mb-[14px] text-2xl font-bold">Top Charts</h2>
          <div className="flex flex-row sm:flex-col gap-3 sm:h-[350px] overflow-x-scroll sm:overflow-y-scroll sm:overflow-x-hidden">
            {playlists.length > 0 && playlists.map((playlist: PlaylistType) => (
              <div key={playlist.id} className="flex sm:items-center justify-between p-4 rounded-[20px] bg-dark-alt w-[80%] sm:w-auto flex-shrink-0 ">
                <div onClick={() => navigate(`/playlist/${playlist.id}`)} className="flex flex-col sm:flex-row sm:items-center gap-4  cursor-pointer">
                  <img src={playlist.cover} className="w-24 h-24 sm:w-16 sm:h-16 rounded-[10px]" alt="" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base">{playlist.title}</h3>
                    <span className="text-white/50 text-xs">{displayArtists(playlist.files)}...</span>
                    <span className="text-xs">{totalDuration(playlist.files)}</span>
                  </div>
                </div>
                <div>
                  <button onClick={() => updateLikes(playlist.id)} className="p-[10px] rounded-full border border-light-o text-secondary">
                    {likes.includes(playlist.id) ? <FaHeart /> : <BsHeart />}
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