import React from 'react';
// import star_icon from '../../assets/images/star_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IReviewStarProps {
    rating: number;
}

const ReviewStar: React.FC<IReviewStarProps> = ({ rating }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            {Array(rating)
                .fill(null)
                .map((el, idx) => (
                    <div>
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: '#f04c4c', fontSize: '18px' }}
                        />
                    </div>
                ))}
        </div>
    );
};


export default ReviewStar;
