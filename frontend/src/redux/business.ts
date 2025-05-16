import { IBusiness, BusinessState, IActionCreator } from './types/business';

// ============ ACTION TYPES =================
export const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
export const CREATE_BUSINESS = 'businesses/createBusiness';

// ============ ACTION CREATOR =================
const getAllBusinessesAction = (businesses: IBusiness[]) => ({
    type: GET_ALL_BUSINESSES,
    payload: businesses,
});

const createBusinessAction = (business: IBusiness) => ({
    type: CREATE_BUSINESS,
    payload: business,
});

// ============ THUNK =================

// Get all businesses
export const thunkGetAllBusinesses = (): any => async (dispatch: any) => {
    try {
        const response = await fetch('/api/businesses');
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

// Create a new business
export const thunkCreateBusiness =
    (businessData: IBusiness): any =>
    async (dispatch: any) => {
        try {
            const response = await fetch('/api/businesses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(businessData),
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

// ============ REDUCER =================
const initialState: BusinessState = {
    byId: {},
    allBusinesses: [],
};

export default function businessReducer(
    state = initialState,
    action: IActionCreator,
): BusinessState {
    let newState = {
        ...state,
    };

    switch (action.type) {
        case GET_ALL_BUSINESSES: {
            if (Array.isArray(action.payload)) {
                const businesses = action.payload;

                const newById = { ...newState.byId };
                businesses.forEach((b: IBusiness) => {
                    newById[b.id] = b;
                });

                newState.byId = newById;
                newState.allBusinesses = businesses;

                return newState;
            }
            return state;
        }

        case CREATE_BUSINESS: {
            if (!Array.isArray(action.payload)) {
                const newBusiness = action.payload;
                newState.allBusinesses = [...newState.allBusinesses, newBusiness];
                newState.byId = { ...newState.byId, [newBusiness.id]: newBusiness };

                return newState;
            }
            return state;
        }

        default:
            return state;
    }
}
