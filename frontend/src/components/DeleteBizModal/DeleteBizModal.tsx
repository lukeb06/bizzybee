import React from 'react';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from '../../redux/review';
import { useModal } from '../../context/Modal';
import './DeleteBizModal.css';

interface DeleteBizModalProps {
  reviewId: number;
}

const DeleteBizModal: React.FC<DeleteBizModalProps> = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(thunkDeleteReview({ id: reviewId }));
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

export default DeleteBizModal;