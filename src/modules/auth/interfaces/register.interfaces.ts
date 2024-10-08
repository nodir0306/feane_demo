export declare interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
}

export declare interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}