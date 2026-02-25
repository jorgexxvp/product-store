import React, { useRef, useState, type FC } from 'react';

interface SliderProps {
  children: React.ReactNode;
  className?: string;
}

export const Slider: FC<SliderProps> = ({ children, className }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden p-10">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`
          flex gap-6 overflow-x-hidden cursor-grab select-none ${className || ''}
          ${isDragging ? 'cursor-grabbing scale-[0.99] transition-transform' : ''}
        `}
      >
        {children}
      </div>
    </div>
  );
};
