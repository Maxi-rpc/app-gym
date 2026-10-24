export interface Image {
    id: string;
    name: string;
    source: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateImageInput {
    name: string;
    source?: string;
    file?: File;
}

export interface UpdateImageInput extends CreateImageInput {
    id: string;
}

export interface DeleteImageInput {
    id: string;
}
