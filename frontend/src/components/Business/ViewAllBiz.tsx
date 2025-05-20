import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBusinesses } from '../../redux/business';
// import './ViewAllBiz.css';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';

export default function ViewAllBiz() {
    const businesses = useSelector((state: RootState) => state.businesses.allBusinesses);
    // console.log('=========THIS IS BUSINESS=====', businesses);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    console.log('Businesses:', businesses);

    useEffect(() => {
        const getBusinesses = async () => {
            dispatch(thunkGetAllBusinesses());
            setIsLoaded(true);
        };
        if (!isLoaded) {
            getBusinesses();
        }
    }, [dispatch, businesses, isLoaded]);

    return (
        <>
            <h1> Welcome to Home Page</h1>
            <div className="businesss-list">
                {businesses.length === 0 ? (
                    <p>No businesss available</p>
                ) : (
                    <div className="businesss-container">
                        {businesses.map((business, index) => (
                            <div key={index} className="property-container">
                                <div className="image-container">
                                    {/* {business.previewImage ? (
                                        <>
                                            <img
                                                src={business.previewImage}
                                                alt={business.name}
                                                className="property-img"
                                            />
                                            <div className="tooltip">{business.name}</div>
                                        </>
                                    ) : (
                                        <div>
                                            <span>No Image</span>
                                        </div>
                                    )} */}
                                </div>
                                <div className="biz-details">
                                    <div className="biz-title">
                                        <p>{business.name}</p>
                                    </div>
                                    <div className="rating-reviews">
                                        {/* <span>
                                                {business.avgRating
                                                    ? parseFloat(business.avgRating).toFixed(1)
                                                    : 'New'}{' '}
                                            </span> */}
                                    </div>
                                    <div className="biz-hour"></div>
                                    <div className="location-price-hour">
                                        <span>
                                            {business.city}, {business.state}
                                        </span>
                                        <strong> ‧ </strong>
                                        <span>{'$'.repeat(business.price_range)}</span>
                                        <strong> ‧ </strong>
                                    </div>
                                    <div className="most-recent-review">
                                        {/* <span>
                                            {business.avgRating
                                                ? parseFloat(business.avgRating).toFixed(1)
                                                : 'New'}{' '}
                                        </span> */}
                                    </div>
                                    <p className="price"></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
