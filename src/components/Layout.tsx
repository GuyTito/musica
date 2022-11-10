import MusicPlayer from "../components/MusicPlayer";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSongsContext } from "../context/SongsContext";


export default function Layout() {
  const { queue } = useSongsContext()
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/') navigate('home')

  
  return (
    <>
      <div className="sm:flex ">
        <div className="hidden sm:block"><Sidebar /></div>

        <div className="mb-24 sm:mb-32 mx-6 sm:mx-0 sm:mr-[60px]">
          <Searchbar />

          <Outlet />
          
        </div>

        {queue.length > 0 && <MusicPlayer />}

      </div>
    </>
  )
}