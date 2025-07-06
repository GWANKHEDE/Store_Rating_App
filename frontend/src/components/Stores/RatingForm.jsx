import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingForm = ({ onSubmit, currentRating = 0 }) => {
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(null);

  return (
    <div className="my-4">
      <div className="flex justify-center mb-2">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                className="cursor-pointer text-2xl"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <button
        onClick={() => onSubmit(rating)}
        className="btn-primary w-full"
        disabled={!rating}
      >
        {currentRating ? 'Update Rating' : 'Submit Rating'}
      </button>
    </div>
  );
};

export default RatingForm;
