import { useState } from "react";
import { FaStar } from "react-icons/fa";

export function StarRating({ starRating, onChange }) {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={onChange}
            />
            <FaStar
              className="star"
              color={
                ratingValue <= (hover || starRating) ? "#ffc107" : "#d8d8d8"
              }
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export function StarRatingResult({ ratingResult }) {
  return (
    <div>
      {[...Array(ratingResult)].map((_, i) => {
        return (
          <label key={i}>
            <input type="radio" name="rating" />
            <FaStar key={i} className="star" color={"#ffc107"} size={30} />
          </label>
        );
      })}
    </div>
  );
}
