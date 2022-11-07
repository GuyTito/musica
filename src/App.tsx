import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SongsProvider from "./context/SongsContext";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";


export default function App() {
  
  
  return (
    <>
      <SongsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="playlist/:id" element={<Playlist />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SongsProvider>
    </>
  )
}