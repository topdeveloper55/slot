/** @jsxImportSource @emotion/react */
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import { useSlotMachineStyles } from "./SlotMachine.style";
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
    return ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png", "/7.png", "/8.png", "/9.png", "/10.png", "/11.png", "/12.png", "/13.png", "/14.png", "/15.png", "/16.png", "/17.png", "/18.png"][Math.floor(Math.random() * 18)];
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

  const checkWin = () => {
    let previousSlot = slots[0];
    let win = true;
    slots.forEach((slot) => {
      if (!win) return;
      if (
        slot.items[slot.items.length - 2].value !==
        previousSlot.items[previousSlot.items.length - 2].value
      ) {
        win = false;
      }

      previousSlot = slot;
    });

    if (win) {
      alert("Win");
    }
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
      <div className="flex fixed w-full h-full items-center justify-center">
        <div className="h-[100%]">
          <img src="/slot mchn.png" className="h-full w-full" />
        </div>
      </div>
      <div className="flex fixed bottom-4 right-0 z-10">
        <button onClick={() => !spinning && spin()}>
          <img src="/spin.png" className="h-4/5" />
        </button>
      </div>
      <div className="flex fixed w-full h-full items-center justify-center">
        <div className="ml-12 mt-[76px]" css={styles.rowsContainer}>
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
                  <img src={item.value}/>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
