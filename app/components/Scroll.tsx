"use client";

import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";
import shirt from "./../../public/Shirts.jpg";
import party from "./../../public/Party.png";
import Image from "next/image";
import { Button } from "./ui/button";

export const programsData = [
  {
    id: "1",
    heading1: "Two Piece",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "2",
    heading1: "Three Piece",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "3",
    heading1: "Shirts",
    img: <Image src={shirt} alt="Party Wear"></Image>,
  },
  {
    id: "4",
    heading1: "Trousers",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "5",
    heading1: "Shawls",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "6",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "7",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "8",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "9",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "10",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
  {
    id: "11",
    heading1: "Party Wear",
    img: <Image src={party} alt="Party Wear"></Image>,
  },
];

const Scroll = () => {
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } =
    useSmoothHorizontalScroll();

  return (
    <section className="relative max-w-screen-xl hidden md:flex md:m-14 justify-center items-center mt-10">
      <h2 className="text-xl md:text-2xl font-semibold ml-7">DRESSES</h2>
      <Button className="scroll-smooth hover:scroll-auto" onClick={() => scrollTo(-100)} disabled={isAtStart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-left"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </Button>
      <div
        className="flex scrollbar scrollbar-hide scroll-smooth hover:scroll-auto cursor-pointer"
        ref={scrollContainerRef as React.RefObject<HTMLDivElement>}
        onScroll={handleScroll}
        style={{ overflowX: "scroll" }}
      >
        {programsData.map((elem) => (
          <div key={elem.id}>
            <div className="w-36 h-25 overflow-auto scrollbar-hide gap-2 rounded-full ">
              {elem.img}
            </div>
            <div>
              <h3 className="ml-9">{elem.heading1}</h3>
            </div>
          </div>
        ))}
        
      </div>
      <Button className="scroll-smooth hover:scroll-auto" onClick={() => scrollTo(100)} disabled={isAtEnd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Button>
    </section>
  );
};
export default Scroll;
