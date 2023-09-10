export interface RegisterResponse {
    success: boolean;
    message: string;
    data: Register[];
}

export interface Register {
    name: string;
    lastname: string;
    mail: string;
    phone: string;
    username: string;
    password: string;
    password_confirmation: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    name:     string;
    lastname: string;
    mail:     string;
    phone:    string;
}
