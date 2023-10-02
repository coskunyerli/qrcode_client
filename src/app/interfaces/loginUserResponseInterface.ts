export interface LoginUserResponseInterface {
    contact: string;
    otp: string;
    message: string;
};

export interface VerifyUserResponseInterface {
    token: string;
    user_id: number;
    contact: string;
};