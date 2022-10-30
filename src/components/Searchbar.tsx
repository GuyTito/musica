import { FormEvent, useState } from "react";
import search from "../assets/icons/search.png";


export default function Searchbar() {
  const [modal, setModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setModal(true)
  }

  function closeModal(){
    setSearchTerm("")
    setModal(false)
  }
  
  
  return (
    <>
      {/* search bar */}
      <form onSubmit={(e)=>handleSubmit(e)} className=" pl-7 flex items-center w-[60%]">
        <img src={search} alt='search' className="mr-5" />
        <input type="text" value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" 
          placeholder="Search songs" />
      </form>

      {/* search result modal */}
      {modal && 
        <div className="absolute bg-dark inset-0 top-[68px]">
          <button onClick={()=>closeModal()} className="py-1 px-[10px] rounded-full border-[3px] border-secondary text-secondary absolute right-20">&#x2715;</button>
        </div>
      }
    </>
  )
}