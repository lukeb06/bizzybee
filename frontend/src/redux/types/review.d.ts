import { GET_ALL_REVIEWS, CREATE_REVIEW } from '../review';

export interface IReview {
    id: number,
    user_id: number,
    review: string,
    business_id : number,
    stars: number
}

export interface IReviewForm {
    review: string,
    stars: number
}
export interface IReviewBusinessId{
    id: number
}



export interface ReviewState {
    byId: ReviewId;
    allReviews: IReview[];
}

export interface IReviewActionCreator {
    type: string;
    payload: IReview | IReview[];
}


