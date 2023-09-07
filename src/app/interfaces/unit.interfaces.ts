export interface UnitGet {
    success: boolean;
    message: string;
    data:    Unit[];
}

export interface Unit {
    unit_id:          number;
    unit_name:        string;
    unit_description: string;
    subject_id:       number;
}