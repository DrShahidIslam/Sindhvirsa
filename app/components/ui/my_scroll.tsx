"use client";
import { useState } from 'react';
import Image from 'next/image';

type ImageScrollerProps = {
  images: string[];
};

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    const scrollAmount = 300;
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
    setScrollPosition(newPosition);
  };

  return (
    <div className="max-w-4xl mx-auto my-5">
      <div className="flex items-center">
        <button onClick={() => handleScroll('left')}><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-left cursor-pointer hover:scale-140"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg></button>
        <div
          className="overflow-x-scroll whitespace-nowrap flex-1 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              display: 'flex',
            }}
          >
            {images.map((image) => (
              <div key={image} className="flex-shrink-0 mr-2">
                <Image
                  src={image}
                  alt=""
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleScroll('right')}><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevron-right cursor-pointer hover:scale-140"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg></button>
      </div>
    </div>
  );
};

export default ImageScroller;
