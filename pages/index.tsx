/** @jsxImportSource @emotion/react */
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import { useSlotMachineStyles } from "../components/SlotMachine.style";
import { useEffect, useState } from "react";
import Display from "seven-segment-display"


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
let order1 = 0;
export default function Home() {
  const styles = useSlotMachineStyles();
  const [slots, setSlots] = useState<SlotsType>([]);
  const [slotCount, setSlotCount] = useState<number>(5);
  const [itemCount, setItemCount] = useState<number>(64);
  const [bet, setBet] = useState<number>(0.4);
  const [winModalShow, setWinModalShow] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState("");
  let resul = [];
  

  const getRandomItem = () => {
    return [
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
    ][Math.floor(Math.random() * 16)];
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
    let mainItem = array[0];
    let k = 1;
    let wildNum = 0;
    let matchArray = [array[0]];
    for (var i = 1; i < array.length; i++) {
      if (mainItem === "/9.png" && array[i] !== "/9.png") {
        mainItem = array[i];
        k++;
        matchArray.push(array[i]);
      } else if (mainItem !== "/9.png" && array[i] !== "/9.png") {
        if (mainItem === array[i]) {
          k++;
          matchArray.push(array[i]);
        } else break;
      } else if (mainItem === "/9.png" && array[i] === "/9.png") {
        k++;
        matchArray.push(array[i]);
      } else if (mainItem !== "/9.png" && array[i] === "/9.png") {
        k++;
        matchArray.push(array[i]);
      }
    }
    if (k < 3) return 0;
    else if (k >= 3) {
      console.log("matchArray----------->", matchArray);
      for (var i = 0; i <= matchArray.length; i++) {
        if (matchArray[i] === "/9.png") wildNum++;
      }
      const item = {
        item: mainItem,
        number: k,
        wildNum: wildNum,
      };
      return item;
    }
  };
  const [betNum1, setBetNum1] = useState(0);
  const [betNum2, setBetNum2] = useState(4);
  const [order, setOrder] = useState(0);
  const betNumArray = [
    {
      a1:0,
      a2:4,
      bet:0.4
    },
    {
      a1:0,
      a2:8,
      bet:0.8
    },
    {
      a1:1,
      a2:2,
      bet:1.2
    },
    {
      a1:2,
      a2:0,
      bet:2.0
    },
    {
      a1:5,
      a2:0,
      bet:5.0
    }
  ];

  console.log("bet----->", bet) 
  const setMaxBet = () => {
    order1=4;
      setBetNum1(betNumArray[order1].a1)
      setBetNum2(betNumArray[order1].a2)
      setBet(betNumArray[order1].bet)
  }
  const setBetAdd = () => {
    order1++;
    if(order1 !==5){
      setBetNum1(betNumArray[order1].a1)
      setBetNum2(betNumArray[order1].a2)
      setBet(betNumArray[order1].bet)
    }
    else if(order1 === 5){
      order1=0;
      setBetNum1(betNumArray[order1].a1)
      setBetNum2(betNumArray[order1].a2)
      setBet(betNumArray[order1].bet)
    } 
  }
  const setBetMinus = () => {
    order1--;
    if(order1 !== -1){
      setBetNum1(betNumArray[order1].a1)
      setBetNum2(betNumArray[order1].a2)
      setBet(betNumArray[order1].bet)
    }
    else if(order1 === -1){
      order1=4;
      setBetNum1(betNumArray[order1].a1)
      setBetNum2(betNumArray[order1].a2)
      setBet(betNumArray[order1].bet)
    }  
  }

  const checkWin = () => {
    let a = [];
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 3].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 2].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 1].value);
    });
    let itemsArray = [];
    // a[11] = "/9.png";
    // a[7] = "/9.png";
    // a[3] = "/9.png";
    itemsArray[1] = [a[5], a[6], a[7], a[8], a[9]];
    itemsArray[2] = [a[0], a[1], a[2], a[3], a[4]];
    itemsArray[3] = [a[10], a[11], a[12], a[13], a[14]];
    itemsArray[4] = [a[0], a[6], a[12], a[8], a[4]];
    itemsArray[5] = [a[10], a[6], a[2], a[8], a[14]];
    itemsArray[6] = [a[5], a[1], a[2], a[3], a[9]];
    itemsArray[7] = [a[5], a[11], a[12], a[13], a[9]];
    itemsArray[8] = [a[0], a[1], a[7], a[13], a[14]];
    itemsArray[9] = [a[10], a[11], a[7], a[3], a[4]];
    itemsArray[10] = [a[5], a[1], a[7], a[13], a[9]];
    itemsArray[11] = [a[5], a[11], a[7], a[3], a[9]];
    itemsArray[12] = [a[0], a[6], a[7], a[8], a[4]];
    itemsArray[13] = [a[10], a[6], a[7], a[8], a[14]];
    itemsArray[14] = [a[0], a[6], a[2], a[8], a[4]];
    itemsArray[15] = [a[10], a[6], a[12], a[8], a[14]];
    itemsArray[16] = [a[5], a[6], a[2], a[8], a[9]];
    itemsArray[17] = [a[5], a[6], a[12], a[8], a[9]];
    itemsArray[18] = [a[0], a[1], a[12], a[3], a[4]];
    itemsArray[19] = [a[10], a[11], a[2], a[13], a[14]];
    itemsArray[20] = [a[0], a[11], a[12], a[13], a[4]];
    itemsArray[21] = [a[10], a[1], a[2], a[3], a[14]];
    itemsArray[22] = [a[5], a[1], a[12], a[3], a[9]];
    itemsArray[23] = [a[5], a[11], a[2], a[13], a[9]];
    itemsArray[24] = [a[0], a[11], a[2], a[13], a[4]];
    itemsArray[25] = [a[10], a[1], a[12], a[3], a[14]];
    let maxArray = [];
    const getBetResult = (result) => {
      let betResult = 0;
      if (result.item === "/2.png") {
        if (result.number === 3) betResult = 0.15 * bet;
        else if (result.number === 4) betResult = 0.6 * bet;
        else if (result.number === 5) betResult = 4 * bet;
      } else if (result.item === "/3.png") {
        if (result.number === 3) betResult = 0.15 * bet;
        else if (result.number === 4) betResult = 0.6 * bet;
        else if (result.number === 5) betResult = 4 * bet;
      } else if (result.item === "/4.png") {
        if (result.number === 3) betResult = 0.5 * bet;
        else if (result.number === 4) betResult = 1.5 * bet;
        else if (result.number === 5) betResult = 10 * bet;
      } else if (result.item === "/5.png") {
        if (result.number === 3) betResult = 0.4 * bet;
        else if (result.number === 4) betResult = 1.3 * bet;
        else if (result.number === 5) betResult = 9 * bet;
      } else if (result.item === "/6.png") {
        if (result.number === 3) betResult = 0.3 * bet;
        else if (result.number === 4) betResult = 1.2 * bet;
        else if (result.number === 5) betResult = 8 * bet;
      } else if (result.item === "/7.png") {
        if (result.number === 3) betResult = 0.3 * bet;
        else if (result.number === 4) betResult = 1.2 * bet;
        else if (result.number === 5) betResult = 8 * bet;
      } else if (result.item === "/8.png") {
        if (result.number === 3) betResult = 0.4 * bet;
        else if (result.number === 4) betResult = 1.3 * bet;
        else if (result.number === 5) betResult = 9 * bet;
      } else if (result.item === "/10.png") {
        if (result.number === 3) betResult = 0.6 * bet;
        else if (result.number === 4) betResult = 1.6 * bet;
        else if (result.number === 5) betResult = 15 * bet;
      } else if (result.item === "/11.png") {
        if (result.number === 3) betResult = 1 * bet;
        else if (result.number === 4) betResult = 2 * bet;
        else if (result.number === 5) betResult = 17 * bet;
      } else if (result.item === "/12.png") {
        if (result.number === 3) betResult = 1.2 * bet;
        else if (result.number === 4) betResult = 2.5 * bet;
        else if (result.number === 5) betResult = 20 * bet;
      } else if (result.item === "/13.png") {
        if (result.number === 3) betResult = 1.5 * bet;
        else if (result.number === 4) betResult = 3 * bet;
        else if (result.number === 5) betResult = 25 * bet;
      } else if (result.item === "/14.png") {
        if (result.number === 3) betResult = 0.25 * bet;
        else if (result.number === 4) betResult = 1 * bet;
        else if (result.number === 5) betResult = 7 * bet;
      } else if (result.item === "/15.png") {
        if (result.number === 3) betResult = 0.2 * bet;
        else if (result.number === 4) betResult = 0.75 * bet;
        else if (result.number === 5) betResult = 6 * bet;
      } else if (result.item === "/16.png") {
        if (result.number === 3) betResult = 0.15 * bet;
        else if (result.number === 4) betResult = 0.6 * bet;
        else if (result.number === 5) betResult = 4 * bet;
      } else if (result.item === "/17.png") {
        if (result.number === 3) betResult = 0.15 * bet;
        else if (result.number === 4) betResult = 0.6 * bet;
        else if (result.number === 5) betResult = 4 * bet;
      } else if (result.item === "/18.png") {
        if (result.number === 3) betResult = 0.15 * bet;
        else if (result.number === 4) betResult = 0.6 * bet;
        else if (result.number === 5) betResult = 4 * bet;
      }
      if (result.wildNum === 0 || result.wildNum === 1) {
        return betResult;
      } else if (result.wildNum === 2) return betResult * 2;
      else if (result.wildNum === 3) return betResult * 6;
      else if (result.wildNum === 4) return betResult * 24;
    };
    for (var i = 1; i <= 25; i++) {
      maxArray[i] = getMax(itemsArray[i]);
    }
    console.log("maxArray---->", maxArray);
    let matchArray = [];
    for (var i = 1; i <= maxArray.length; i++) {
      if (maxArray[i] != undefined && maxArray[i] != 0)
        matchArray.push({
          bettingLine: i,
          item: maxArray[i].item,
          number: maxArray[i].number,
          wildNum: maxArray[i].wildNum,
        });
    }
    console.log("matchArray-------->", matchArray);
    setResult([...matchArray]);
    resul = matchArray;

    let sum = 0;
    for (var i = 0; i < matchArray.length; i++) {
      if (matchArray[i].item !== "/1.png") {
        const num = getBetResult(matchArray[i]);

        console.log("num------->", num);
        sum += num;
      }
    }
    console.log("sum------->", sum);
    setTotal(sum.toFixed(2));
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
      console.log("result-------->", result);
      if(resul.length !== 0) 
      setWinModalShow(true);
      else spinReset();
      // spinReset();  
    }, maxDuration * 1200);
  };

  // generate initial slots
  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, []);

  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, [slotCount, itemCount]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerHeight, window.innerWidth);
    });
  }, []);
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
      <div className="absolute bottom-[216px] left-[131px] z-20">
          <img src="/dollar.png" className="w-[33px] h-4/5" />
      </div>
      <div className="flex fixed bottom-4 left-0 z-10">
        <button onClick={() => setMaxBet()}>
          <img src="/max bet.png" className="h-4/5" />
        </button>
      </div>
      <div className="flex fixed bottom-36 left-0 z-10">
        <div className="inline-flex">
          <button onClick={() => setBetMinus()}>
            <img src="/minus.png" className="h-[60%]"/>
          </button>
          <img src="/bet-2.png" className="h-4/5 ml-[-40px]" />
          <button onClick={() => setBetAdd()} className="ml-[-40px] mt-[-13px]">
            <img src="/add.png" className="h-[60%]"/>
          </button>
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
      <div className="absolute segment bottom-[219px] left-[176px] z-20 w-[32px]">
        <Display value={betNum1} color="#e1fc08" className="segment" digitCount={1}/>
      </div>
      <div className="absolute segment bottom-[224px] left-[266px] z-20 w-[32px]">
        <Display value={betNum2} color="#e1fc08" className="segment" digitCount={1}/>
      </div>
      <div className="absolute bottom-[212px] left-[232px] z-20 text-[53px] text-[#e1fc08]">.</div>
      {winModalShow ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setWinModalShow(false),spinReset();
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/window.png" />
            <div className="flex fixed items-center justify-center">
              <div className="flow-root ">
                <div className="flow-root mt-[212px] w-[820px] h-[200px] items-center justify-center overflow-auto">
                  {result.map((item, index) => (
                    <div
                      className="text-center text-white text-[30px]"
                      key={index}
                    >
                      <div className="inline-flex mb-2">
                        You have matched in Betting line {item.bettingLine} with{" "}
                        {item.number}{" "}
                        <img className="w-[35px] mx-2" src={item.item} />{" "}
                        symbols
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-white text-[35px] mt-3">
                  Total: ${total}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
