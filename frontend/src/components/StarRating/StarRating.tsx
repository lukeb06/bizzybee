import React from 'react';
import './StarRating.css';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        if (i < fullStars) {
            stars.push(<div key={i} className="star full" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<div key={i} className="star half" />);
        } else {
            stars.push(<div key={i} className="star empty" />);
        }
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
