import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ViewAllBusinessesPage from '../components/Businesses';
import Layout from './Layout';
import CreateBusinessFormPage from '../components/CreateBizForm';
import BusinessDetailPage from '../components/Business';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <ViewAllBusinessesPage />,
            },
            {
                path: 'login',
                element: <LoginFormPage />,
            },
            {
                path: 'signup',
                element: <SignupFormPage />,
            },
            {
                path: '/create-business',
                element: <CreateBusinessFormPage />,
            },
            {
                path: '/business/:businessId',
                element: <BusinessDetailPage />,
            },
        ],
    },
]);
