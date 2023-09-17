export interface ScoreResponse {
    success: boolean;
    message: string;
    data?:    ScoreRequest;
}

export interface ScoreResponseGet {
    success: boolean;
    message: string;
    data?:    Score[];
}

export interface ScoreRequest {
    score:    number;
    time:     number;
    resume:   string;
    login_id: number;
    unit_id:  number;
}

export interface Score {
    score_id:     number;
    score_points: number;
    score_date:   Date;
    score_time:   number;
    score_resume: string;
    login_id:     number;
    unit_id:      number;
}