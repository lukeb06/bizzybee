import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBusinesses } from '../../redux/business';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

// interface ISignUpErrors {
//     server?: any;
//     email?: string;
//     username?: string;
//     password?: string;
//     confirmPassword?: string;
// }

export default function HomePage() {
    // const allBusinesses = useSelector((state: RootState) => state.businesses.allBusinesses);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // console.log('Businesses:', allBusinesses);

    // useEffect(() => {
    //     const getBusinesses = async () => {
    //         dispatch(thunkGetAllBusinesses());
    //         getBusinesses();
    //     };
    // }, [dispatch, allBusinesses]);

    return (
        <>
            <h1> Welcome to Home Page</h1>
        </>
    );
}
