export interface AuthResponse {
    success: boolean;
    message: string;
}

export interface Auth {
    username: string;
    password: string;
} 

export interface LoginResponse {
    success: boolean;
    message: string;
    data: Login;
}

export interface Login {
    login_id: number;
    login_username: string;
    login_password: string;
    login_validation: boolean;
}