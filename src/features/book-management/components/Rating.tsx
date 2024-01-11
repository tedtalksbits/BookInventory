import { Star } from 'lucide-react';
import { useState } from 'react';
interface RatingProps {
  maxRatings?: number;
  rating?: number;
  onRate?: (rating: number) => void;
}
export const Rating = ({ maxRatings = 5, onRate, rating }: RatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(rating || 0);

  const handleMouseOver = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    if (rating) {
      setHoveredRating(rating);
      return;
    }
    setHoveredRating(0);
  };

  const handleClick = (rating: number) => {
    onRate && onRate(rating);
  };
  return (
    <div className='flex'>
      {[...Array(maxRatings)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            className={`w-6 h-6 ${
              hoveredRating > index ? 'text-primary' : 'text-background'
            } fill-current cursor-pointer stroke-foreground/80`}
            key={index}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};
