import React, { useEffect, useState } from 'react';
import ReviewStar from '../ReviewStar/ReviewStar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import Reviews from '../Reviews/Reviews';
import './BusinessPage.css';

const BusinessDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { businessId } = useParams<{ businessId: string }>();
    const business = useAppSelector(state =>
        businessId ? state.businesses.byId[Number(businessId)] : undefined,
    );

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!businessId || isNaN(Number(businessId)) || !business) {
            navigate('/');
            return;
        }
        setIsLoaded(true);
    }, [businessId, business, isLoaded]);

    const handleDeleteBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO:
    };
    const handleUpdateBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO navigate to the existing create form page, where everything should be prefilled:
    };

    let reviewCount = 0;

    const checkReviewCount = (reviews: string): string | void => {
        const reviewNum = parseInt(reviews);
        if (reviewNum > 5 || reviewNum < 1) {
            return 'error. todo later';
        } else {
            reviewCount = reviewNum;
        }
    };

    const fakeReviews = ['Hello', 'Bye', 'Food tasted great'];

    if (!isLoaded || !business) {
        return <div>Spot not found</div>;
    }

    const featuredImage = business.featured_image;

    return (
        <div className="business-page">
            <div className="image-gallery">
                <img className="main-image" src={featuredImage} alt="" />
            </div>

            <div className="detail-container">
                <div className="suggested-buttons">
                    <button>Write a Review</button>
                    <button>Add photos/videos</button>
                    <button>Share</button>
                    <button>Save</button>
                </div>
                <div className="business-info">
                    <h1>{business.name}</h1>
                    <div className="ratings">
                        <span>{'*'.repeat(Math.floor(business.average_rating))}</span>
                        <span>
                            {business.average_rating} {business.review_count} reviews
                        </span>
                    </div>
                    <div className="other-info">
                        <span>{business.price_range}</span>
                        <span>{business.category}</span>
                    </div>
                    <div className="spot-description">
                        <p>{business.description}</p>
                    </div>
                </div>
                <div className="callout-box">
                    <h2>Order Food</h2>
                    <div className="delivery-detail">
                        <span>Free Delievery</span>
                        <span>$0 min</span>
                        <span>30-40 min</span>
                    </div>
                    <input type="text" placeholder="Delivery Address" />
                    <button>Start Order</button>
                    <p>Get directions</p>
                    <p>{business.address}</p>
                </div>
            </div>
            {/* Dev items, please delete if not needed, or adjust */}
            <button onClick={e => handleDeleteBusiness(e)}>Delete a businesss</button>
            <button onClick={e => handleUpdateBusiness(e)}>Update a business</button>

            <ReviewStar reviewCount={business.average_rating} />

            <Reviews reviews={fakeReviews} />
        </div>
    );
};

export default BusinessDetailPage;
