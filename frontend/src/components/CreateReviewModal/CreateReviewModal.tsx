import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import { thunkCreateReview } from '../../redux/review';
import { thunkGetOneBusiness } from '../../redux/business';
import './CreateReviewModal.css';


function CreateReviewModal() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { closeModal } = useModal();
  
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);

  const disableButton = review.trim().length < 30 || stars === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    const reviewData = {
      review,
      stars,
    };

    const data = await dispatch(thunkCreateReview(reviewData, businessId as any));

    if (data) {
      await dispatch(thunkGetOneBusiness(businessId as any));
      closeModal();
    }
  };

  return (
    <div className="create-review-modal">
      <h2>How was your experience?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave a review between 30 and 1000 characters here..."
        />
        </div>
        <div className="form-group">
        <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={value <= stars ? 'filled' : ''}
                  onClick={() => setStars(value)}
                >
                  ★
                </span>
              ))}
            </div>
            <label htmlFor="stars">Stars</label>
            </div>

        <button 
          type="submit"
          className="review-submit-button"
          disabled={disableButton}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default CreateReviewModal;
