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
    image_urls: string[];
    lat: number;
    lng: number;
}

export interface BusinessId {
    [id: number]: IBusiness;
}

export interface BusinessState {
    byId: BusinessId;
    allBusinesses: IBusiness[];
}

export interface IActionCreator {
    type: string;
    payload: IBusiness | IBusiness[];
}

export interface ValidationErrors {
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    name?: string;
    description?: string;
    priceRange?: string;
    previewImage?: string;
    featuredImage?: string;
    imageUrls?: [];
}
