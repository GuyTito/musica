import { useSongsContext } from "../context/SongsContext";
import { PlaylistType } from "../types";


export default function Collections() {
  const { myCollections, playlists } = useSongsContext()
  let myPlaylists: PlaylistType[] = []
  myCollections?.forEach((id: string) => {
    const data = playlists.find(playlist => playlist.id === id) as PlaylistType
    myPlaylists.push(data)
  })
  
  return (
    <>
      <div>
        {/* tabs */}
        <div className="flex gap-5 items-center">
          <button className="rounded-full px-4 py-2 bg-secondary text-black text-sm">My Collections</button>
          <button className="rounded-full px-4 py-2 text-light-o text-sm border border-light-o">Likes</button>
        </div>

        {/* content */}
        <div className="mt-6">
          {/* my collections */}
          <div className="flex items-center gap-6">
            {myPlaylists.length > 0 && myPlaylists.map((playlist: PlaylistType) => ( 
              <div key={playlist?.id} className="relative rounded-[20px] w-[213px] h-[234px] overflow-hidden">
                <img src={playlist?.cover} className="absolute object-cover w-full h-full object-center" alt="" />
                <div className="absolute z-30 bottom-[22px] ml-5 flex flex-col">
                  <span className="text-2xl text-light">{playlist?.title}</span>
                </div>
              </div>)
            )}
          </div>
        </div>
      </div>
    </>
  )
}