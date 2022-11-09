import golden from "../assets/golden-age.png"
export default function Collections() {
  
  
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
          <div className="flex items-center gap-6">
            <div className="relative rounded-[20px] w-[213px] h-[234px] overflow-hidden">
              <img src={golden} className="absolute object-cover w-full h-full object-center" alt="" />
              <div className="absolute z-30 bottom-[22px] ml-5 flex flex-col">
                <span className="text-2xl text-light">Limits</span>
                <span className="text-[10px] text-light">John Watts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}