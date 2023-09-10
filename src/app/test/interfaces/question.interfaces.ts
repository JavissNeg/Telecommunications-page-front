export interface QuestionResponse {
    success: boolean;
    message: string;
    data?:    Question[];
}

export interface Question {
    question_id:            number;
    question_name:          string;
    question_answers:       string[];
    question_correctAnswer: number;
    unit_id:                number;
}

