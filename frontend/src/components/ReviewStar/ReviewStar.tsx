import React from 'react';
import star_icon from '../../assets/images/star_icon.png'

interface IReviewStarProps {
    reviewCount: number;
}

const ReviewStar:React.FC<IReviewStarProps> = ({reviewCount}) => {
  return (
      <div style={{ display: 'flex', flexDirection: 'row', }}>
          {Array(reviewCount).fill(null).map((el, idx) => (
              <div>
                  <img src={star_icon} style={{ height: '25px', width: '25px' }} />
              </div>
          ))}
      </div>
  );
}

export default ReviewStar;
