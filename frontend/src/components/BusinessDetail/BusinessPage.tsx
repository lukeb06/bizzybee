import React, { useEffect, useState } from 'react';
import ReviewStar from '../ReviewStar/ReviewStar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import Reviews from '../Reviews/Reviews';
import OrderSection from './OrderSection/OrderSection';
import InteractiveButtons from './InteractiveButtons/InteractiveButtons';
import './BusinessPage.css';

const BusinessDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { businessId } = useParams<{ businessId: string }>();
    const business = useAppSelector(state =>
        businessId ? state.businesses.byId[Number(businessId)] : undefined,
    );
    const currentUser = useAppSelector(state => state.session.user);
    const isOwner = currentUser?.id === business?.owner_id;

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
                <div className="detail-left">
                    <div>
                        <InteractiveButtons isOwner={isOwner} isLoggedIn={!!currentUser} />
                    </div>

                    <div className="business-info">
                        <h1>{business.name}</h1>

                        <ReviewStar reviewCount={business.average_rating} />
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
                </div>

                <div className="order-section">
                    <OrderSection business={business} />
                </div>
            </div>
            {/* Dev items, please delete if not needed, or adjust */}
            <button onClick={e => handleDeleteBusiness(e)}>Delete a businesss</button>
            <button onClick={e => handleUpdateBusiness(e)}>Update a business</button>

            <Reviews business={business} />
        </div>
    );
};

export default BusinessDetailPage;
