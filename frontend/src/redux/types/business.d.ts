import { GET_ALL_BUSINESSES, CREATE_BUSINESS } from '../types/business';

export interface IBusiness {
    id: number;
    owner_id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    description: string;
    type: string;
    lat: number;
    lng: number;
    price_range: number;
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
