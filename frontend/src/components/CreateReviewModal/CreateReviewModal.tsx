import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import { thunkCreateReview } from '../../redux/review';
import './CreateReviewModal.css';


function CreateReviewModal() {
  const dispatch = useDispatch();
  const { businessId } = useParams<{ businessId: string }>();
  const { closeModal } = useModal();
  
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState<{ message?: string }>({});

  const disableButton = review.length < 30 || stars === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})

    const reviewData = {
      review,
      stars,
    };

    const data = await dispatch(thunkCreateReview(reviewData, businessId as any));

    if (data && data.message) {
      setErrors(data);
    } else {
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div className="create-review-modal">
      <h2>How was your experience?</h2>
      
      {errors.message && <p className="review-errors">{errors.message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
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
