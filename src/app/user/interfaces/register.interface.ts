export interface RegisterResponse {
    success: boolean;
    message: string;
    data: RegisterRequest[];
}

export interface RegisterRequest {
    username: string;
    password: string;
    name:     string;
    lastname: string;
    mail:     string;
    phone:    string;
}
