import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import ViewAllBusinessesPage from '../components/Businesses';
import Layout from './Layout';
import CreateBusinessFormPage from '../components/CreateBizForm';
import BusinessDetailPage from '../components/BusinessDetail';


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
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
                path: '/business/:businessId',
                element: <BusinessDetailPage />,
            },
            {
                path: '*',
                element: <h1>404 Not Found</h1>,
            },
        ],
    },
]);
