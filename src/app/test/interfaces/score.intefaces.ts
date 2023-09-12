export interface ScoreResponse {
    success: boolean;
    message: string;
    data?:    ScoreRequest;
}

export interface ScoreRequest {
    score:    number;
    time:     number;
    resume:   string;
    login_id: number;
    unit_id:  number;
}
