import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../public/Geometria.ttf",
      weight: "400",
    },
  ],
  variable: "--font-poppins",
});
export default function Home() {

  return (
    <div
      className={`absolute h-full w-full md:overflow-hidden ${poppins.variable} font-sans`}
    >
      <iframe className="h-full w-full fixed" src="1.html"></iframe>
      <div className="flex fixed top-5 left-10 z-10">
        <button>
          <img src="/menu.png" className="h-4/5"/>
        </button>
        <button>
          <img className="ml-[-20px] h-4/5" src="/sound.png" />
        </button>
      </div>
      <div className="flex fixed top-[7rem] left-10 z-10">
        <button>
          <img src="/info.png" className="h-4/5"/>
        </button>
      </div>
      <div className="flex fixed bottom-4 left-0 z-10">
        <button>
          <img src="/max bet.png" className="h-4/5"/>
        </button>
      </div>
      <div className="flex fixed bottom-36 left-0 z-10">
        <div>
          <img src="/bet.png" className="h-4/5"/>
        </div>
      </div>
      <div className="flex fixed bottom-72 left-0 z-10">
        <div>
          <img src="/balance.png" className="h-4/5"/>
        </div>
      </div>
      <div className="flex fixed w-full h-full items-center justify-center">
        <div className="h-[100%]">
          <img src="/slot mchn.png" className="h-full w-full"/>
        </div>
      </div>
      <div className="flex fixed bottom-4 right-0 z-10">
        <button>
          <img src="/spin.png" className="h-4/5"/>
        </button>
      </div>
    </div>
  );
}
