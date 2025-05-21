import React from 'react';

interface IReviewProps {
    reviews:string[]
}

const Reviews:React.FC<IReviewProps> = ({reviews}) => {
  return (
    <div>
      {reviews.map((review, idx) => (
        <div key={idx}>
            <p>{review}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
