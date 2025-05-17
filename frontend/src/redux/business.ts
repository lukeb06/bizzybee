import { IBusiness, BusinessState, IActionCreator } from './types/business';

// ============ ACTION TYPES =================
const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
// const CREATE_BUSINESS = 'businesses/createBusiness';

// ============ ACTION CREATOR =================
const getAllBusinessesAction = (businesses: IBusiness[]) => ({
    type: GET_ALL_BUSINESSES,
    payload: businesses,
});

// const createBusinessAction = (business: Business) => ({
//     type: CREATE_BUSINESS,
//     payload: business,
// });

// ============ THUNK =================

// Get all businesses
export const getAllBusinesses = (): any => async (dispatch: any) => {
    try {
        const response = await fetch('/api/business');
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllBusinessesAction(data));
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

// Create a new spot

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
            const businesses = action.payload;
            newState.allBusinesses = businesses;

            const newById = { ...newState.byId };
            businesses.forEach((b: IBusiness) => (newById[b.id] = b));

            newState.byId = newById;

            return newState;
        }
        default:
            return state;
    }
}
