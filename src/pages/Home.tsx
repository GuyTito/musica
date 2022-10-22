import hug from "../assets/hug.png";
import heart from "../assets/icons/heart.svg";
import bubble from "../assets/bubble.png";
import HoleheartSVG from "../assets/icons/HoleheartSVG";
import golden from "../assets/golden-age.png";
import Layout from "../components/Layout";




export default function Home() {
  
  
  return (
    <>
      <Layout>
        <div className="flex gap-5">
          {/* hero  section */}
          <div className="bg-[#609EAF] w-[60%] py-7  px-10 rounded-[40px] ">
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
          <div className=" w-[40%]">
            <h2 className="mb-[14px] text-2xl font-bold">Top Charts</h2>
            <div className="space-y-3 ">
              <div className="flex items-center justify-between p-4 rounded-[20px] bg-dark-alt ">
                <div className="flex items-center gap-4 ">
                  <img src={golden} className="rounded-[10px]" alt="" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base">Golden age of 80s</h3>
                    <span className="text-white/50 text-xs">Sean Swadder</span>
                    <span className="text-xs">2:34:45</span>
                  </div>
                </div>
                <div>
                  <button className="p-[10px] rounded-full border border-light-o">
                    <HoleheartSVG />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* new releases */}
        <div className="mt-10">
          <h2 className="mb-3 font-bold text-2xl">New releases</h2>
          <div>
            <div>
              <img src={bubble} className="rounded-3xl" alt="" />
              <span className="text-xs">Life in a bubble</span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}