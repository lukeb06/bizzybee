import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBusinesses } from '../../redux/business';
// import './HomePage.css';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const businesses = useSelector((state: RootState) => state.businesses.allBusinesses);
    console.log('=========THIS IS BUSINESS=====', businesses);
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
                            <div key={index} className="property-container" title={business.name}>
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
                                <div className="property-details">
                                    <div className="property-top-row">
                                        <div className="city-state">
                                            {business.city}, {business.state}
                                        </div>
                                        <div className="star-rating">
                                            {/* <span>
                                                {business.avgRating
                                                    ? parseFloat(business.avgRating).toFixed(1)
                                                    : 'New'}{' '}
                                            </span> */}
                                        </div>
                                    </div>
                                    <p className="price">
                                        <strong>{'$'.repeat(business.price_range)}</strong>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
