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
    console.log(business, 'THIS IS BUSINESS');
    const currentUser = useAppSelector(state => state.session.user);
    const isOwner = currentUser?.id === business?.owner_id;

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

    const handleDeleteBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO:
    };
    const handleUpdateBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO navigate to the existing create form page, where everything should be prefilled:
    };

    if (!isLoaded || !business) {
        return <div>Business not found</div>;
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

                        <div className="rating">
                            <div>
                                <ReviewStar rating={business.average_rating} />
                            </div>
                            <div>
                                {business.average_rating?.toFixed(1)} ({business.review_count})
                                reviews
                            </div>
                        </div>
                        <div className="other-info">
                            <div>
                                <FaCircleCheck color={'#3f9ae3'} />{' '}
                                <strong style={{ color: '#3f9ae3' }}>Claimed</strong>
                            </div>
                            <div className="other-info">
                                •<span>{business.price_range}</span> •
                                <span>{business.category}</span>
                            </div>
                            <div className="spot-description">
                                <p>{business.description}</p>
                            </div>
                        </div>
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
            {/* Dev items, please delete if not needed, or adjust */}
            <button onClick={e => handleDeleteBusiness(e)}>Delete a businesss</button>
            <button onClick={e => handleUpdateBusiness(e)}>Update a business</button>
        </div>
    );
};

export default BusinessDetailPage;
