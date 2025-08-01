import { IBusiness, BusinessState, IBusinessActionCreator, IBusinessForm, IFilteredBusiness, IBusinessId } from './types/business';

// ============ ACTION TYPES =================
export const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
export const CREATE_BUSINESS = 'businesses/createBusiness';
export const GET_ONE_BUSINESS = 'businesses/getOneBusiness';
export const UPDATE_BUSINESS = 'businesses/updateBusiness';
export const REMOVE_BUSINESS = 'businesses/removeBusiness';

// ============ ACTION CREATOR =================
const getAllBusinessesAction = (businesses: IBusiness[]) => ({
    type: GET_ALL_BUSINESSES,
    payload: businesses,
});

const createBusinessAction = (business: IBusiness) => ({
    type: CREATE_BUSINESS,
    payload: business,
});

const getOneBusinessAction = (business: IBusiness) => ({
    type: GET_ONE_BUSINESS,
    payload: business,
});

const updateBusinessAction = (business: IBusiness) => ({
    type: UPDATE_BUSINESS,
    payload: business,
});

const removeBusinessAction = (businessId: IBusinessId) => ({
    type: REMOVE_BUSINESS,
    payload: businessId,
});

// ============ THUNK =================

// Get all businesses
export const thunkGetAllBusinesses = (businessFilters: IFilteredBusiness): any => async (dispatch: any) => {
    try {
        const url = new URL('/api/business', window.location.origin);
        if(businessFilters.name){
            url.searchParams.set('name', businessFilters.name);

        }
           if(businessFilters.category){
            url.searchParams.set('category', businessFilters.category);
        }
           if(businessFilters.min_price){
            url.searchParams.set('min_price', businessFilters.min_price);
        }
           if(businessFilters.max_price){
            url.searchParams.set('max_price', businessFilters.max_price);
        }
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllBusinessesAction(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        const errorMessages = await err.json();
        return errorMessages;
    }
};

// Get one business
export const thunkGetOneBusiness =
    (businessId: string): any =>
    async (dispatch: any) => {
        try {
            const response = await fetch(`/api/business/${businessId}`);
            if (response.ok) {
                const data = await response.json();
                dispatch(getOneBusinessAction(data));
                return data;
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            const errorMessages = await err.json();
            return errorMessages;
        }
    };

// Create a new business
export const thunkCreateBusiness =
    (businessData: IBusinessForm): any =>
    async (dispatch: any) => {
        try {
            const response = await fetch('/api/business/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(businessData),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(createBusinessAction(data));
                return data;
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            const errorMessages = await err.json();
            return errorMessages;
        }
    };

// Update a new business
export const thunkUpdateBusiness =
    (businessData: IBusinessForm, businessId: number | string): any =>
    async (dispatch: any) => {
        try {
            const response = await fetch(`/api/business/${businessId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(businessData),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(updateBusinessAction(data));
                return data;
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            const errorMessages = await err.json();
            return errorMessages;
        }
    };

// Delete a new business
export const thunkRemoveBusiness =
    (businessId: IBusinessId): any =>
    async (dispatch: any) => {
        try {
            const response = await fetch(`/api/business/${businessId.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(removeBusinessAction(businessId));
                return data;
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            const errorMessages = await err.json();
            return errorMessages;
        }
    };

// ============ REDUCER =================
const initialState: BusinessState = {
    byId: {},
    allBusinesses: [],
};

export default function businessReducer(
    state = initialState,
    action: IBusinessActionCreator,
): BusinessState {
    let newState = {
        ...state,
    };
    let newById = { ...newState.byId };
    let allBusiness = [...newState.allBusinesses];

    switch (action.type) {
        case GET_ALL_BUSINESSES:
            if (Array.isArray(action.payload)) {
                const businesses = action.payload;
                businesses.forEach((b: IBusiness) => {
                    newById[b.id] = b;
                });
                allBusiness = action.payload;

                newState.byId = newById;
                newState.allBusinesses = allBusiness;
                return newState;
            }
            return state;

        case GET_ONE_BUSINESS:
            if (!Array.isArray(action.payload)) {
                const business = action.payload;
                newById[business.id] = business;

                newState.byId = { ...newState.byId, [business.id]: business };
                newState.allBusinesses = [...newState.allBusinesses, business];

                return newState;
            }
            return state;

        case CREATE_BUSINESS:
            if (!Array.isArray(action.payload)) {
                const newBusiness = action.payload;
                newState.allBusinesses = [...newState.allBusinesses, newBusiness];
                newState.byId = { ...newState.byId, [newBusiness.id]: newBusiness };

                return newState;
            }
            return state;
        case UPDATE_BUSINESS:
            const newBusiness = action.payload as IBusiness;
            const index = allBusiness.findIndex(b => b.id === newBusiness.id);
            if (index !== -1) {
                newState.allBusinesses[index] = newBusiness;
            } else return state;
            return newState;
        case REMOVE_BUSINESS:
            const businessId = action.payload as IBusinessId;
            newState.allBusinesses = newState.allBusinesses.filter(b => b.id !== businessId.id);
            return newState;
        default:
            return state;
    }
}
