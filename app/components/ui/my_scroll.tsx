"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';

type ImageScrollerProps = {
  images: { url: string; name: string }[];
};

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    const x = e.pageX - startX;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - x;
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const scrollAmount = 300;
    if (scrollContainerRef.current) {
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollContainerRef.current.scrollLeft - scrollAmount)
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollLeft = newPosition;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    const direction =
      e.clientX - scrollContainerRef.current.getBoundingClientRect().left <
      scrollContainerRef.current.offsetWidth / 2
        ? 'left'
        : 'right';
    const scrollAmount = 100;

    setScrollInterval(
      setInterval(() => {
        const newPosition =
          direction === 'left'
            ? Math.max(0, scrollContainerRef.current!.scrollLeft - scrollAmount)
            : scrollContainerRef.current!.scrollLeft + scrollAmount;
        scrollContainerRef.current!.scrollLeft = newPosition;
      }, 50)
    );
  };

  const handleMouseLeave = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex items-center">
        <button
          onClick={() => handleScroll('left')}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left mx-4 hover:scale-140 cursor-pointer"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div
          ref={scrollContainerRef}
          className="overflow-x-scroll whitespace-nowrap flex-1 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {images.map((image) => (
              <li key={image.url} className="flex-shrink-0 mr-2 relative">
                <Image
                  src={image.url}
                  alt="Sindhvirsa"
                  width={200}
                  height={200}
                  className="rounded-full cursor-pointer w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
                />
                <span className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-all duration-300"></span>
                {/* <p className="text-center mt-2">{image.name}</p> */}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => handleScroll('right')}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right mx-4 hover:scale-140 cursor-pointer"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageScroller;
