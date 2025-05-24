import React, { useEffect, useState } from 'react';
import ReviewStar from '../ReviewStar/ReviewStar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import Reviews from '../Reviews/Reviews';

const BusinessDetailPage: React.FC = () => {

    const navigate = useNavigate();
    const { businessId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const business = useAppSelector((state) => state.businesses.byId[Number(businessId)])



    // const fakeBusiness = {
    //     title: "Tabla Indian Cafe & Sweets Orlando",
    //     reviews: "5.0",
    //     category: "Indian",
    //     images: ['https://rasushi.com/wp-content/uploads/2023/03/DSC08947_SUSHI-PLATTER.jpg']
    // }

    const handleDeleteBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO:

    }
    const handleUpdateBusiness = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO navigate to the existing create form page, where everything should be prefilled:

    }

    let reviewCount = 0;

    const checkReviewCount = (reviews: string): string | void => {
        const reviewNum = parseInt(reviews);
        if (reviewNum > 5 || reviewNum < 1) {
            return "error. todo later"
        } else {
            reviewCount = reviewNum;
        }
    }

    console.log(business)
    // const fakeReviews = [
    //     "Hello",
    //     "Bye",
    //     "Food tasted great"
    // ]


    useEffect(() => {
        console.log(typeof businessId, "what is this?")
        if ((businessId === '0')) {
            console.log(businessId, "here")
            navigate('/')
            setIsLoaded(false);
        } else {
            setIsLoaded(true);
        }
    }, [isLoaded])

    if (!isLoaded) {
        return null
    } else {

        return (
            <div>
                <h1>{business.name}</h1>
                {/* Dev items, please delete if not needed, or adjust */}
                <button onClick={(e) => handleDeleteBusiness(e)}>Delete a businesss</button>
                <button onClick={(e) => handleUpdateBusiness(e)}>Update a business</button>
                {/* --------- */}
                {/* {fakeBusiness.images.map((url, key) => (
                <div key={`${key}-${url}`}>
                <img src={url} style={{height: '200px', width: '200px'}} />
                </div>
                ))} */}
                <div>
                    <img src={business.featured_image} style={{ height: '200px', width: '200px' }} />
                </div>
                <div>
                    <img src={business.preview_image} style={{ height: '200px', width: '200px' }} />
                </div>
                {typeof checkReviewCount(business.review_count) === 'string' ?
                    <div>
                        <span>errors</span>
                    </div>
                    :
                    <ReviewStar reviewCount={business.average_rating} />
                }

                <Reviews business={business} />

            </div>
        );
    }
};

export default BusinessDetailPage;
