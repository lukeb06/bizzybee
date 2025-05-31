import React from 'react';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from '../../redux/review';
import { thunkGetOneBusiness } from '../../redux/business';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import './DeleteReviewModal.css'

interface DeleteReviewModalProps {
  reviewId: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { businessId } = useParams();

  const handleDelete = async () => {
    await dispatch(thunkDeleteReview({ id: reviewId }));
    await dispatch(thunkGetOneBusiness(businessId as any));
    closeModal();
  };

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <h2 className="delete-modal-title">Confirm Delete</h2>
        <p className="delete-modal-message">Are you sure you want to delete this review?</p>
        <div className="delete-modal-buttons">
          <button
            className="delete-modal-button delete-modal-button-no"
            onClick={closeModal}
          >
            No (Keep Review)
          </button>
          <button
            className="delete-modal-button delete-modal-button-yes"
            onClick={handleDelete}
          >
            Yes (Delete Review)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;