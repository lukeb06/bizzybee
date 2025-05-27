export interface SessionInitialState {
    user: null | IUser;
}

export interface IUser {
    id: number;
    email: string;
    username: string;
}

export interface ISignUpUser {
    email: string;
    username: string;
    password: string;
}

export interface ICredentials {
    email: string;
    password: string;
}
