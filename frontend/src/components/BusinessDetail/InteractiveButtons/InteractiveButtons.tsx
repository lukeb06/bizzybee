import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { CiCamera } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { CiBookmark } from 'react-icons/ci';
import './InteractiveButtons.css';

interface IInteractiveButtonsProps {
    isOwner: boolean;
    isLoggedIn: boolean;
}

const InteractiveButtons: React.FC<IInteractiveButtonsProps> = ({ isOwner, isLoggedIn }) => {
    return (
        <div className="suggested-buttons">
            {isLoggedIn && !isOwner && (
                <button className="btn review-btn">
                    {' '}
                    <FaRegStar /> Write a Review
                </button>
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
