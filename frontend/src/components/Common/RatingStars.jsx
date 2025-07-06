import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingStars = ({ rating, size = 'md', showNumber = false }) => {
  const validatedRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(validatedRating);
  const hasHalfStar = validatedRating % 1 >= 0.5 && validatedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className="flex items-center">
      <div className={`flex ${sizeClasses[size]} text-yellow-500`}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="mx-0.5" />
        ))}
        
        {hasHalfStar && <FaStarHalfAlt key="half" className="mx-0.5" />}
        
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="mx-0.5" />
        ))}
      </div>
      
      {showNumber && (
        <span className="ml-1 text-gray-600 text-sm">
          {validatedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showNumber: PropTypes.bool
};

export default RatingStars;
