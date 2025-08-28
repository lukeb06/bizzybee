import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBusinesses } from '../../redux/business';
import './ViewAllBusinesses.css';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewStar from '../ReviewStar/ReviewStar';
import { IFilteredBusiness } from '../../redux/types/business';

export default function ViewAllBusinessesPage() {
    const businesses = useSelector((state: RootState) => state.businesses.allBusinesses);
    // console.log('=========THIS IS BUSINESS=====', businesses);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const filters: IFilteredBusiness = {};
    // console.log('Businesses:', businesses);

    useEffect(() => {
        const getBusinesses = async () => {
            dispatch(thunkGetAllBusinesses(filters));
            setIsLoaded(true);
        };
        if (!isLoaded) {
            getBusinesses();
        }
    }, [dispatch, businesses, isLoaded]);

    const goToSpotDetail = (
        e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
        business: { id: number },
    ) => {
        e.preventDefault();
        navigate(`/business/${business.id}`);
    };

    return (
        <>
            <div className="business-list">
                {businesses.length === 0 ? (
                    <p>No businesses available</p>
                ) : (
                    <div className="business-list">
                        {businesses.map((business, index) => (
                            <div
                                key={index}
                                className="property-container"
                                onClick={e => goToSpotDetail(e, business)}
                                title={business.name}
                            >
                                <div key={index} className="business-card">
                                    <div className="image-container">
                                        {business.preview_image ? (
                                            <>
                                                <img
                                                    src={business.preview_image}
                                                    alt={business.name}
                                                    className="biz-img"
                                                />
                                                <div className="tooltip">{business.name}</div>
                                            </>
                                        ) : (
                                            <div>
                                                <span>No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="biz-details">
                                        <div className="biz-title">
                                            <h2>{business.name}</h2>
                                            <button className="order-btn">Order</button>
                                        </div>
                                        {/* <div className="star-rating">
                                            <span>
                                                {business.average_rating
                                                    ? parseFloat(business.average_rating).toFixed(1)
                                                    : 'New'}{' '}
                                            </span>
                                            <span className="review-count">(42 reviews)</span>
                                        </div> */}
                                        <ReviewStar rating={business.average_rating} />

                                        <div className="location-price-hour">
                                            <span>
                                                {business.city}, {business.state}
                                            </span>
                                            <span> • </span>
                                            <span>{'$'.repeat(business.price_range)}</span>
                                            <span> • </span>
                                            <span className="status"> Open </span>{' '}
                                            <span>until 7:00 AM</span>
                                        </div>
                                        <div className="most-recent-review">
                                            {/* need to add */}
                                            {business.description}
                                        </div>
                                        <div className="tag-order">
                                            <div className="tags">
                                                <span className="business-tag">Coffee & Tea</span>
                                                <span className="business-tag">Sandwiches</span>
                                                <span className="business-tag">
                                                    Coffee Roasteries
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
