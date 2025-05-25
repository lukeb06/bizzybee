import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { thunkGetAllReviews, thunkDeleteReview } from '../../redux/review';
import { IReview, IReviewId } from '../../redux/types/review';
import { IBusiness } from '../../redux/types/business';
import ReviewStar from '../ReviewStar/ReviewStar';
import OpenModalButton from '../OpenModalButton';
import './Reviews.css';
import { FaUserCircle } from 'react-icons/fa';

const formatReviewDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
};

interface ReviewsProps {
    business: IBusiness | undefined;
}

const Reviews: React.FC<ReviewsProps> = ({ business }) => {
    const dispatch = useAppDispatch();

    const reviews = useAppSelector(state => state.reviews.allReviews);
    const sessionUser = useAppSelector(state => state.session.user);

    useEffect(() => {
        if (business) {
            dispatch(thunkGetAllReviews({ id: business.id }));
        }
    }, [dispatch, business]);

    const sortedReviews = [...reviews].sort((a, b) => b.id - a.id);

    const showPostFirstReviewMessage = sortedReviews.length === 0 && [];
    sessionUser && business && sessionUser.id !== business.owner_id;

    return (
        <div className="reviews-container">
            <h2>Reviews</h2>
            {sortedReviews.length > 0 ? (
                <div className="reviews-list">
                    {sortedReviews.map((review: IReview) => (
                        <div key={review.id} className="review-item">
                            <div className="user-info">
                                <div>
                                    <FaUserCircle size={45} color={'#a6a6a6'} />
                                </div>
                                <div>
                                    <p className="review-date">
                                        {formatReviewDate(review.created_at)}
                                    </p>
                                    <ReviewStar rating={review.stars} />
                                </div>
                            </div>
                            <p className="review-text">{review.review}</p>
                            {sessionUser?.id === review.user_id && (
                                <OpenModalButton buttonText="Delete" />
                            )}
                        </div>
                    ))}
                </div>
            ) : showPostFirstReviewMessage ? (
                <p>Be the first to post a review!</p>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;
