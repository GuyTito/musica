import MusicPlayer from "../components/MusicPlayer";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSongsContext } from "../context/SongsContext";


export default function Layout() {
  const { queue } = useSongsContext()

  
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="ml-6 w-full mb-32 mr-[60px]">
          <Searchbar />

          <Outlet />
          
        </div>

        {queue.length > 0 && <MusicPlayer />}

      </div>
    </>
  )
}