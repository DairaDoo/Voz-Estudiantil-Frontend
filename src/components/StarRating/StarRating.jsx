import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = rating >= starValue;
    const isHalfFilled = !isFilled && rating > index && rating < starValue;

    return (
      <div
        key={index}
        style={{
          position: "relative",
          display: "inline-block",
          width: "24px",
          height: "24px",
        }}
      >
        <FaStar
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            stroke: "#000",
            strokeWidth: "1px",
            fill: isFilled ? "#ffd966" : "none",
          }}
        />
        {isHalfFilled && (
          <FaStar
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              fill: "#ffd966",
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div className="star-rating">
      {stars}
      <span
        style={{
          fontSize: "1rem",
          marginLeft: "8px",
          color: "#007bff",
          fontWeight: "bold",
        }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
