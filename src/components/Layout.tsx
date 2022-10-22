import MusicPlayer from "../components/MusicPlayer";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { LayoutProps } from "../types";


export default function Layout({children}: LayoutProps) {
  
  
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="ml-6 w-full mb-32 mr-[60px]">
          <Searchbar />

          {children}
          
        </div>

        <MusicPlayer />

      </div>
    </>
  )
}