import { GET_ALL_BUSINESSES, CREATE_BUSINESS } from '../types/business';

export interface IBusiness {
    id: number;
    owner_id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    description: string;
    category: string;
    price_range: number;
    preview_image: string;
    featured_image: string;
    average_rating: float;
    review_count: number;
    image_urls: string[];
    lat: number;
    lng: number;
}

export interface IBusinessForm {
    owner_id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    description: string;
    category: string;
    price_range: string;
    preview_image: string;
    featured_image: string;
    image_urls: string[];
    lat?: string;
    lng?: string;
}

export interface BusinessId {
    [id: number]: IBusiness;
}

export interface BusinessState {
    byId: BusinessId;
    allBusinesses: IBusiness[];
}

export interface IBusinessActionCreator {
    type: string;
    payload: IBusiness | IBusiness[];
}

export interface ValidationErrors {
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    name?: string;
    description?: string;
    priceRange?: string;
    previewImage?: string;
    featuredImage?: string;
    imageUrls?: [];
}
