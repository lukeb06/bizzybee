import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { CiCamera } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { CiBookmark } from 'react-icons/ci';
import OpenModalButton from '../../OpenModalButton';
import './InteractiveButtons.css';
import CreateReviewModal from '../../CreateReviewModal';

interface IInteractiveButtonsProps {
    isOwner: boolean;
    isLoggedIn: boolean;
    hasReviewed: boolean;
}

const InteractiveButtons: React.FC<IInteractiveButtonsProps> = ({ isOwner, isLoggedIn, hasReviewed }) => {
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
        </div>
    );
};

export default InteractiveButtons;
