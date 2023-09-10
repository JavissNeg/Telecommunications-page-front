export interface SubjectsResponse {
    success: boolean;
    message: string;
    data?:    Subjects[];
}

export interface Subjects {
    subject_id:          number;
    subject_name:        string;
    subject_description: string;
    subject_date:        string;
}

export interface SubjectResponse {
    success: boolean;
    message: string;
    data?:  UnitsBySubject[];
}

export interface UnitsBySubject {
    subject_id:          number;
    subject_name:        string;
    subject_description: string;
    subject_date:        string;
    unit_id:             number;
    unit_name:           string;
    unit_description:    string;
}