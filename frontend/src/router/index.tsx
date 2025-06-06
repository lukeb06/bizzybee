import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import ViewAllBusinessesPage from '../components/Businesses';
import Layout from './Layout';
import CreateBusinessFormPage from '../components/CreateBizForm';
import BusinessDetailPage from '../components/BusinessDetail';
import HomePage from '../components/HomePage';

import SearchPage from '../components/SearchPage/SearchPage';

import UpdateBusinessFormPage from '../components/UpdateBizForm';


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/business',
                element: <ViewAllBusinessesPage />,
            },
            {
                path: '/login',
                element: <LoginFormPage />,
            },

            {
                path: '/create-business',
                element: <CreateBusinessFormPage />,
            },
            {
                path: '/update-business/:businessId',
                element: <UpdateBusinessFormPage />,
            },
            {
                path: '/business/:businessId',
                element: <BusinessDetailPage />,
            },
            {
                path: '/business/search',
                element: <SearchPage/>
            },
            {
                path: '*',
                element: <h1>404 Not Found</h1>,
            },
        ],
    },
]);
