import React from 'react';
import { FaPencilAlt, FaRegStar, FaTrash } from 'react-icons/fa';
import { CiCamera } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { CiBookmark } from 'react-icons/ci';
import OpenModalButton from '../../OpenModalButton';
import './InteractiveButtons.css';
import CreateReviewModal from '../../CreateReviewModal';
import DeleteBusinessModal from '../../DeleteBizModal';

interface IInteractiveButtonsProps {
    isOwner: boolean;
    isLoggedIn: boolean;
    hasReviewed: boolean;
    businessId: any;
    handleUpdateBusiness: any;
}

const InteractiveButtons: React.FC<IInteractiveButtonsProps> = ({ isOwner, isLoggedIn, hasReviewed, businessId, handleUpdateBusiness }) => {
    return (
        <div className="suggested-buttons">
            {isLoggedIn && !isOwner && !hasReviewed && (
                <OpenModalButton
                    className="btn review-btn"
                    icon={<FaRegStar />}
                    buttonText="Write a Review"
                    modalComponent={<CreateReviewModal />}
                />
            )}
            <button className="btn">
                {' '}
                <CiCamera /> Add photos/videos
            </button>
            <button className="btn">
                <IoShareOutline /> Share
            </button>
            <button className="btn">
                <CiBookmark />
                Save
            </button>
            {isLoggedIn && isOwner &&
                (<button className="btn" onClick={e => handleUpdateBusiness(e)}>
                    <FaPencilAlt /> Update business
                </button>)
            }
            {isLoggedIn && isOwner &&
                (<OpenModalButton
                    className="btn"
                    buttonText="Delete Business"
                    icon={<FaTrash />}
                    onModalClose={null}
                    modalComponent={<DeleteBusinessModal businessId={businessId as any} />}
                />)
            }
        </div>
    );
};

export default InteractiveButtons;
