import { IReview, ReviewAction, ReviewState, IReviewForm, IReviewBusinessId, IReviewId} from './types/review';

// ============ ACTION TYPES =================
export const GET_ALL_REVIEWS = 'reviews/getAllReviews';
export const CREATE_REVIEW = 'reviews/createReview';
export const DELETE_REVIEW = 'reviews/deleteReview'
// ============ ACTION CREATOR =================
const getAllReviewsAction = (reviews: IReview[]): ReviewAction => ({
    type: GET_ALL_REVIEWS,
    payload: reviews,
});

const createReviewAction = (review: IReview): ReviewAction => ({
    type: CREATE_REVIEW,
    payload: review,
});
const deleteReviewAction = (review: IReviewId): ReviewAction => ({
    type: DELETE_REVIEW,
    payload: review,
});

// ============ THUNK =================

// Get all reviews
export const thunkGetAllReviews = (id: IReviewBusinessId): any => async (dispatch: any) => {
    try {
        const response = await fetch(`/api/reviews/business/${id.id}`);
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllReviewsAction(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        const errorMessages = await err.json();
        return errorMessages;
    }
};

// Create a new review
export const thunkCreateReview =
    (reviewData: IReviewForm, id: IReviewBusinessId): any =>
        async (dispatch: any) => {
            try {
                const response = await fetch(`/api/reviews/business/${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reviewData),
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch(createReviewAction(data));
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
        export const thunkDeleteReview =
    (id: IReviewId): any =>
        async (dispatch: any) => {
            try {
                const response = await fetch(`/api/reviews/${id.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch(deleteReviewAction(id));
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
        export const thunkEditReview = (reviewToEdit: IReview): any => async (dispatch: any) => {
          const { id, review, stars } = reviewToEdit;
          const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            review,
            stars
        })
    });
          const data = await response.json();
          dispatch(getAllReviewsAction(data));
          return data;
        };


const initialState: ReviewState = {
    byId: {},
    allReviews: [],
};

export default function reviewReducer(
    state = initialState,
    action: ReviewAction,
): ReviewState {
    let newState = {
        ...state,
    };
    let newById = { ...newState.byId };
    let allReview = [...newState.allReviews];

    switch (action.type) {
        case GET_ALL_REVIEWS:
            if (Array.isArray(action.payload)) {
                const reviews = action.payload;
                reviews.forEach((review: IReview) => {
                    newById[review.id] = review;
                });
                allReview = action.payload;

                newState.byId = newById;
                newState.allReviews = allReview;
                return newState;
            } else {
                return state;
            }
        case CREATE_REVIEW:
            if (!Array.isArray(action.payload)) {
                const newReview = action.payload;
                newState.allReviews = [...newState.allReviews, newReview];
                newState.byId = { ...newState.byId, [newReview.id]: newReview };

                return newState;
            }
            return state;
        case DELETE_REVIEW:
            if (!Array.isArray(action.payload)) {
            const review = action.payload;
            allReview = newState.allReviews.filter((element) => element.id !== review.id)
            delete newState.byId[review.id]
            newState.allReviews = allReview;
            return newState;
            }
            return state;

        default:
            return state;
    }
}
