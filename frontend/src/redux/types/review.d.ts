import { GET_ALL_REVIEWS, CREATE_REVIEW, DELETE_REVIEW } from '../review';

export interface IReview {
    id: number,
    user_id: number,
    review: string,
    business_id: number,
    stars: number,
    created_at: string,
    updated_at: string
}

export interface IReviewForm {
    review: string,
    stars: number
}
export interface IReviewBusinessId {
    id: number
}
export interface IReviewId {
    id: number
}




export interface ReviewState {
    byId: ReviewId;
    allReviews: IReview[];
}

interface Action<Type extends string, Payload> {
    type: Type;
    payload: Payload;
}

export type GetAllReviews = Action<typeof GET_ALL_REVIEWS, IReview[]>;
export type CreateReview = Action<typeof CREATE_REVIEW, IReview>;
export type DeleteReview = Action<typeof DELETE_REVIEW, IReviewId>;


export type ReviewAction = GetAllReviews | CreateReview | DeleteReview;

