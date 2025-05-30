import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditReview } from '../../redux/review';
import { thunkGetOneBusiness } from '../../redux/business';
import { IReview } from '../../redux/types/review';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import './EditReviewModal.css';


interface EditReviewModalProps {
  reviewToEdit: IReview;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({ reviewToEdit }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { businessId } = useParams();
  const [reviewText, setReviewText] = useState(reviewToEdit.review);
  const [stars, setStars] = useState(reviewToEdit.stars);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setReviewText(reviewToEdit.review);
    setStars(reviewToEdit.stars);
  }, [reviewToEdit]);

  const handleStarClick = (newStars: number) => {
    setStars(newStars);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const updatedReview = {
      id: reviewToEdit.id,
      review: reviewText,
      stars,
    } as IReview;

    const data = await dispatch(thunkEditReview(updatedReview));

    if (data && data.error) {
      setErrors(Array.isArray(data.error) ? data.error : [data.error]);
    } else {
      await dispatch(thunkGetOneBusiness(businessId as any));
      closeModal();
    }
  };

  return (
    <div className="edit-review-modal-overlay">
      <div className="edit-review-modal">
        <h2>Edit Review</h2>
        {errors.length > 0 && (
          <div className="error-container">
            {errors.map((error, idx) => (
              <p key={idx} className="error-message">{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reviewText">Review:</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stars">Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={value <= stars ? 'filled' : ''}
                  onClick={() => handleStarClick(value)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit">
              Update Review
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;
