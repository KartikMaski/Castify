'use client';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'relative bg-orange-1 px-4 py-6 flex flex-col justify-end w-full h-full xl:max-w-[328px] min-h-[260px] rounded-[14px] cursor-pointer overflow-hidden',
        className
      )}
      onClick={handleClick}
    >
      {/* Image centered and spanning 75-80% of the card height */}
      <div
        className="absolute top-0 left-18 w-full h-[95%] bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'contain', // Ensure the image is fully visible
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Text lowered to the bottom of the card */}
      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
