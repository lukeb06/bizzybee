import React, { useEffect, useState } from 'react';
import ReviewStar from '../ReviewStar/ReviewStar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { thunkGetOneBusiness } from '../../redux/business';
import Reviews from '../Reviews/Reviews';
import OrderSection from './OrderSection/OrderSection';
import InteractiveButtons from './InteractiveButtons/InteractiveButtons';
import { FaCircleCheck } from 'react-icons/fa6';
import './BusinessPage.css';

const BusinessDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { businessId } = useParams<{ businessId: string }>();
    const business = useAppSelector(state =>
        businessId ? state.businesses.byId[Number(businessId)] : undefined,
    );
    // console.log(business, 'THIS IS BUSINESS');
    const reviews = useAppSelector(state => state.reviews.allReviews);
    const currentUser = useAppSelector(state => state.session.user);
    const isOwner = currentUser?.id === business?.owner_id;
    const hasReviewed = reviews.some(review => review.user_id === currentUser?.id);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchBusinessDetail = async () => {
            if (businessId && !isNaN(Number(businessId))) {
                await dispatch(thunkGetOneBusiness(businessId));
                setIsLoaded(true);
            } else {
                navigate('/');
            }
        };
        if (!isLoaded) {
            fetchBusinessDetail();
        }
    }, [businessId, dispatch, navigate]);

    if (!business) {
        return <div>Business not found</div>;
    }

    const handleUpdateBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate(`/update-business/${businessId}`);
    };

    if (!isLoaded || !business) {
        return <div>Business not found</div>;
    }

    const featuredImage = business.featured_image;

    return (
        <div className="business-page">
            <div className="image-gallery">
                <img className="main-image" src={featuredImage} alt="" />
                <div className="image-overlay">
                    <div className="business-info">
                        <h1>{business.name}</h1>

                        <div className="rating">
                            <div>
                                {business.review_count ? (
                                    <ReviewStar rating={business.average_rating} />
                                ) : (
                                    'New'
                                )}
                            </div>
                            <div>
                                {business.average_rating?.toFixed(1)} ({business.review_count}{' '}
                                {business.review_count === 1 ? 'Review' : 'Reviews'})
                            </div>
                        </div>
                        <div className="other-info">
                            <div>
                                <FaCircleCheck color={'#3f9ae3'} />{' '}
                                <strong style={{ color: '#3f9ae3' }}>Claimed</strong>
                            </div>
                            <div className="other-info">
                                ·<span>{'$'.repeat(business.price_range)}</span> ·
                                <span>{business.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-container">
                <div className="detail-left">
                    <div>
                        <InteractiveButtons
                            isOwner={isOwner}
                            isLoggedIn={!!currentUser}
                            hasReviewed={hasReviewed}
                            businessId={businessId}
                            handleUpdateBusiness={handleUpdateBusiness}
                        />
                    </div>

                    <hr className="separator" />
                    <h2>About the Business</h2>
                    <div className="business-description">{business.description}</div>

                    <hr className="separator" />
                    <Reviews business={business} />
                </div>

                <div className="order-section">
                    <OrderSection business={business} />
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailPage;
