export interface Welcome {
    response: Response[];
}

export interface Response {
    canViewOriginal: boolean;
    createdDate:     EdDate;
    filename:        string;
    fileSizeBytes:   number;
    fileType:        number;
    id:              string;
    isDerivative:    boolean;
    media:           Media;
    modifiedDate:    EdDate;
    originalAssetId: null;
    ownerId:         string;
    parentId:        string;
    revisionNumber:  number;
    thumbnails:      Thumbnails;
}

export interface EdDate {
    rfc3339:   Date;
    timestamp: number;
}

export interface Media {
    image: Image;
}

export interface Image {
    height: number;
    width:  number;
}

export interface Thumbnails {
    large:  Large;
    medium: Large;
    small:  Large;
}

export interface Large {
    height: number;
    url:    string;
    width:  number;
}
