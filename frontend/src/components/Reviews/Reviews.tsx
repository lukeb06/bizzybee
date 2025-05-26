import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { thunkGetAllReviews } from '../../redux/review';
import { IReview } from '../../redux/types/review';
import { IBusiness } from '../../redux/types/business';
import ReviewStar from '../ReviewStar/ReviewStar';
import OpenModalButton from '../OpenModalButton';
import './Reviews.css';
import DeleteReviewModal from '../DeleteReviewModal';
import EditReviewModal from '../EditReviewModal';
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
                            <div className="review-body">
                <p className="review-text">{review.review}</p>
                {sessionUser?.id === review.user_id && (
                  <OpenModalButton
                    className="edit-button"
                    buttonText="Edit"
                    onModalClose={null}
                    modalComponent={<EditReviewModal reviewToEdit={review} />}
                  />
                )}
              </div>
              {sessionUser?.id === review.user_id && (
                <OpenModalButton
                  className="delete-button"
                  buttonText="Delete"
                  onModalClose={null}
                  modalComponent={<DeleteReviewModal reviewId={review.id} />}
                />
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
