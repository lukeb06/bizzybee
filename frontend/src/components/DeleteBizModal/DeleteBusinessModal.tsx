import React from 'react';
import { useDispatch } from 'react-redux';
import { thunkRemoveBusiness } from '../../redux/business';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';

interface DeleteBusinessModalProps {
  businessId: number;
}

const DeleteBusinessModal: React.FC<DeleteBusinessModalProps> = ({ businessId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          await dispatch(thunkRemoveBusiness({id: Number(businessId)}));
          closeModal();
          navigate('/business');
      };

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <h2 className="delete-modal-title">Confirm Delete</h2>
        <p className="delete-modal-message">Are you sure you want to delete this business?</p>
        <div className="delete-modal-buttons">
          <button
            className="delete-modal-button delete-modal-button-no"
            onClick={closeModal}
          >
            No (Keep Business)
          </button>
          <button
            className="delete-modal-button delete-modal-button-yes"
            onClick={handleDelete}
          >
            Yes (Delete Business)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBusinessModal;