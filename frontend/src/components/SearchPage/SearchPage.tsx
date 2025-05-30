import './SearchPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBusinesses } from '../../redux/business';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewStar from '../ReviewStar/ReviewStar';
import { IFilteredBusiness } from '../../redux/types/business';
export default function SearchPage(){
const businesses = useSelector((state: RootState) => state.businesses.allBusinesses);
    // console.log('=========THIS IS BUSINESS=====', businesses);
    const dispatch = useDispatch();
    const location=useLocation()
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [filters, setFilters] = useState({})
    
    // console.log('Businesses:', businesses);

    useEffect(() => {
        const getBusinesses = async () => {
            setFilters(location.state)
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
                                        <div className="biz-hour"></div>
                                        <div className="location-price-hour">
                                            <span>
                                                {business.city}, {business.state}
                                            </span>
                                            <span> • </span>
                                            <span>{'$'.repeat(business.price_range)}</span>
                                            <span> • </span>
                                            <span> Closed/Open until 7:00AM</span>
                                        </div>
                                        <div className="most-recent-review">
                                            {/* <span>
                                            {business.avgRating
                                                ? parseFloat(business.avgRating).toFixed(1)
                                                : 'New'}{' '}
                                        </span> */}
                                        </div>
                                        <div className="tag-order">
                                            <div className="tags">
                                                <span className="tag">Coffee & Tea</span>
                                                <span className="tag">Sandwiches</span>
                                                <span className="tag">Coffee Roasteries</span>
                                            </div>
                                            <button className="order-button">Order</button>
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