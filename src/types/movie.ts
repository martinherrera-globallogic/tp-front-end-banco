export interface MoviesAPIResult {
    results: Movie[]
} 

export interface Movie {
    "id": string
    "originalTitleText": OriginalTitleText
    "position": number,
    "primaryImage": PrimaryImage
    "releaseDate": ReleaseDate
}

interface OriginalTitleText {
    "text": string
}

interface PrimaryImage {
    "height": number,
    "id": string,
    "url": string,
    "width": number
}

export interface ReleaseDate {
    "day": number,
    "month": number,
    "year": number
}