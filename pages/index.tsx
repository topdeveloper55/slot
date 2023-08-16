/** @jsxImportSource @emotion/react */
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import { useSlotMachineStyles } from "../components/SlotMachine.style";
import { useEffect, useState } from "react";

const poppins = localFont({
  src: [
    {
      path: "../public/Geometria.ttf",
      weight: "400",
    },
  ],
  variable: "--font-poppins",
});
type SlotsType = {
  id: string;
  y: string;
  durationSeconds: number;
  items: {
    id: string;
    value: string;
  }[];
}[];
export default function Home() {
  const styles = useSlotMachineStyles();
  const [slots, setSlots] = useState<SlotsType>([]);
  const [slotCount, setSlotCount] = useState<number>(5);
  const [itemCount, setItemCount] = useState<number>(64);

  const [spinning, setSpinning] = useState<boolean>(false);

  const getRandomItem = () => {
    return [
      "/1.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/9.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
    ][Math.floor(Math.random() * 18)];
  };

  const generateSlots = (
    slotCount: number,
    itemCount: number,
    slots: SlotsType = []
  ) => {
    const generatedSlots: SlotsType = [];

    for (let slot = 0; slot < slotCount; slot++) {
      generatedSlots.push({
        id: String(crypto.randomUUID()),
        y: `${itemCount * 5 - 4 * 4 + 1}rem`,
        durationSeconds: 0,
        items: [],
      });

      for (let item = 0; item < itemCount; item++) {
        const oldSlots = slots[slot]?.items;

        if (oldSlots && item < 3 && oldSlots.length >= 3) {
          generatedSlots[slot].items.push(oldSlots[oldSlots.length - 3 + item]);

          continue;
        }

        const randomItem = getRandomItem();

        generatedSlots[slot].items.push({
          id: String(crypto.randomUUID()),
          value: randomItem,
        });
      }
    }

    setSlots(generatedSlots);
  };

  const getMax = (array) => {
    let b = array;
    let c = [];
    let d = [];
    for (var i = 0; i < 5; i++){
      let k = 0
      for (var j = 0; j < i; j++){
        if (b[i] === d[j]) k++;
      }
      if (k === 0) d.push(b[i])
    }


    for(var i = 0; i < d.length; i++){
      let k = 0;
      for(var j = 0; j < 5; j++){
        if(d[i]===b[j]) k++;
      }
      c[i] = {
        target: b[i],
        value: k
      };
    }
    const max = Math.max(...c.map(obj => obj.value));
    const maxObject  = c.filter(function(o) { return o.value === max; });
    if (max > 2) return maxObject;  
  }

  const checkWin = () => {
    let a = [];
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 3].value);
    })
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 2].value);
    })
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 1].value);
    })
    let itemsArray = [];
    itemsArray[1] = [a[5],a[6],a[7],a[8],a[9]];
    itemsArray[2] = [a[0],a[1],a[2],a[3],a[4]];
    itemsArray[3] = [a[10],a[11],a[12],a[13],a[14]];
    itemsArray[4] = [a[0],a[6],a[12],a[8],a[4]];
    itemsArray[5] = [a[10],a[6],a[2],a[8],a[14]];
    itemsArray[6] = [a[5],a[1],a[2],a[3],a[9]];
    itemsArray[7] = [a[5],a[11],a[12],a[13],a[9]];
    itemsArray[8] = [a[0],a[1],a[7],a[13],a[14]];
    itemsArray[9] = [a[10],a[11],a[7],a[3],a[4]];
    itemsArray[10] = [a[5],a[1],a[7],a[13],a[9]];
    itemsArray[11] = [a[5],a[11],a[7],a[3],a[9]];
    itemsArray[12] = [a[0],a[6],a[7],a[8],a[4]];
    itemsArray[13] = [a[10],a[6],a[7],a[8],a[14]];
    itemsArray[14] = [a[0],a[6],a[2],a[8],a[4]];
    itemsArray[15] = [a[10],a[6],a[12],a[8],a[14]];
    itemsArray[16] = [a[5],a[6],a[2],a[8],a[9]];
    itemsArray[17] = [a[5],a[6],a[12],a[8],a[9]];
    itemsArray[18] = [a[0],a[1],a[12],a[3],a[4]];
    itemsArray[19] = [a[10],a[11],a[2],a[13],a[14]];
    itemsArray[20] = [a[10],a[1],a[2],a[3],a[14]];
    itemsArray[21] = [a[10],a[1],a[2],a[3],a[14]];
    itemsArray[22] = [a[5],a[1],a[12],a[3],a[9]];
    itemsArray[23] = [a[5],a[11],a[2],a[13],a[9]];
    itemsArray[24] = [a[0],a[11],a[2],a[13],a[4]];
    itemsArray[25] = [a[10],a[1],a[12],a[3],a[14]];
    let maxArray = [];

    for (var i = 1;i <= 25;i++){
      console.log("betting case",i,"=", itemsArray[i]);
      maxArray[i]=getMax(itemsArray[i]);
    }
    console.log("maxArray-------->", maxArray)
    

    // let previousSlot = slots[0];
    // let win = true;
    // slots.forEach((slot) => {
    //   if (!win) return;
    //   if (
    //     slot.items[slot.items.length - 2].value !==
    //     previousSlot.items[previousSlot.items.length - 2].value
    //   ) {
    //     win = false;
    //   }

    //   previousSlot = slot;
    // });

    // if (win) {
    //   alert("Win");
    // }
  };

  const spinReset = () => {
    slots.forEach((row) => {
      row.durationSeconds = 0;
    });

    generateSlots(slotCount, itemCount, slots);

    setSpinning(false);
  };

  const spin = () => {
    setSpinning(true);

    let maxDuration = 0;

    slots.forEach((row, index) => {
      row.y = "0";
      row.durationSeconds = 2 + index;

      if (row.durationSeconds > maxDuration) {
        maxDuration = row.durationSeconds;
      }
    });

    setSlots([...slots]);
    setTimeout(() => {
      checkWin();
      // spinReset();
    }, maxDuration * 1000);
  };

  // generate initial slots
  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, []);

  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, [slotCount, itemCount]);
  useEffect(()=> {
      window.addEventListener('resize', ()=> {
          console.log(window.innerHeight, window.innerWidth)
      })
  }, [])
  return (
    <div
      className={`absolute h-full w-full md:overflow-hidden ${poppins.variable} font-sans`}
    >
      <iframe className="h-full w-full fixed" src="1.html"></iframe>
      <div className="flex fixed top-5 left-10 z-10">
        <button>
          <img src="/menu.png" className="h-4/5" />
        </button>
        <button>
          <img className="ml-[-20px] h-4/5" src="/sound.png" />
        </button>
      </div>
      <div className="flex fixed top-[7px] left-[700px] text-[20px] text-white z-10">
        Mastech Wireless Tech Pvt LTD
      </div>
      <div className="flex fixed top-[7rem] left-10 z-10">
        <button>
          <img src="/info.png" className="h-4/5" />
        </button>
      </div>
      <div className="flex fixed bottom-4 left-0 z-10">
        <button>
          <img src="/max bet.png" className="h-4/5" />
        </button>
      </div>
      <div className="flex fixed bottom-36 left-0 z-10">
        <div>
          <img src="/bet.png" className="h-4/5" />
        </div>
      </div>
      <div className="flex fixed bottom-72 left-0 z-10">
        <div>
          <img src="/balance.png" className="h-4/5" />
        </div>
      </div>
      <div className="flex fixed w-[1920px] h-[1000px] items-center justify-center">
        <div className="h-[100%]">
          <img src="/slot mchn.png" className="h-[965px] w-[1714px]" />
        </div>
      </div>
      <div className="flex fixed bottom-4 right-0 z-10">
        <button onClick={() => !spinning && spin()}>
          <img src="/spin.png" className="h-4/5" />
        </button>
      </div>
      <div className="flex fixed w-[1920px] h-[1000px] items-center justify-center">
        <div className="ml-12 mt-[38px]" css={styles.rowsContainer}>
          {slots.map((slot) => (
            <div
              css={styles.slotsContainer}
              key={slot.id}
              style={{
                transform: `translateY(${slot.y})`,
                transitionDuration: `${slot.durationSeconds}s`,
              }}
            >
              {slot.items.map((item) => (
                <div key={item.id} css={styles.slotContainer}>
                  <img src={item.value} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
