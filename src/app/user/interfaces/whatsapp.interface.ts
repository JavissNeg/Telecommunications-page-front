export interface SendCodeResponse {
    success: boolean;
    message: string;
    data: SendCode;
}

export interface SendCode {
    verificationCode: string;
    whatsappBody: string
}