import MusicPlayer from "../components/MusicPlayer";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  
  
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="ml-6 w-full mb-32 mr-[60px]">
          <Searchbar />

          <Outlet />
          
        </div>

        <MusicPlayer />

      </div>
    </>
  )
}