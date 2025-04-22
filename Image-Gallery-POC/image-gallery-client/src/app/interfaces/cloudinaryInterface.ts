
export interface CloudinaryRoot {
    resources: Resource[];
}
export interface CreatedBy {
    access_key: string;
    custom_id: string;
    external_id: string;
}

export interface Resource {
    asset_id: string;
    public_id: string;
    folder: string;
    filename: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    uploaded_at: string;
    bytes: number;
    backup_bytes: number;
    width: number;
    height: number;
    aspect_ratio: number;
    pixels: number;
    url: string;
    thumbnail_url: string;
    secure_url: string;
    status: string;
    access_mode: string;
    access_control: any;
    created_by: CreatedBy;
    uploaded_by: UploadedBy;
    etag: string;
}

export interface Root {
    total_count: number;
    time: number;
    next_cursor: string;
    resources: Resource[];
}

export interface UploadedBy {
    access_key: string;
    custom_id: string;
    external_id: string;
}