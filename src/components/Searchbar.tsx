import search from "../assets/icons/search.png";


export default function Searchbar() {
  
  
  return (
    <>
      <form className=" pl-7 flex items-center w-[60%]">
        <img src={search} alt='search' className="mr-5" />
        <input type="text" className="text-light bg-transparent placeholder-white/25 text-sm w-full py-6 outline-none" placeholder="Search tracks, artists..." />
      </form>
    </>
  )
}