export interface SubjectResponse {
    success: boolean;
    message: string;
    data?:    Subject[];
}

export interface Subject {
    subject_id:          number;
    subject_name:        string;
    subject_description: string;
    subject_date:        string;
}