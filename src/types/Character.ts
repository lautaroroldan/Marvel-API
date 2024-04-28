export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
    series: Comics;
    stories: Comics;
    events: Comics;
    urls: Url[];
}

export interface Comics {
    available: number;
    collectionURI: string;
    items: any[];
    returned: number;
}

// export interface Comic {
//     id: number
//     name: string
//     available: number
//     collectionURI: string
//     items: []
//     returned: number
//     description: string
//     events: []
//     modified: string
//     resourceURI: string
//     series: []
//     stories: []
//     thumbnail: Thumbnail
//     url: Url[]
// }

export interface Comic {
    id: number
    characters: CommonIterableObject[]
    collectedIssues: []
    collections: []
    creators: CommonIterableObject[]
    dates: ComicDate[]
    description: string
    diamondCode: string
    digitalId: number
    ean: string
    events: CommonIterableObject[]
    format: string
    images: Thumbnail[]
    isbn: string
    issn: string
    issueNumber: number
    modified: string
    pageCount: number
    prices: ComicPrice[]
    resourceURI: string
    series: [{
        name: string
        resourceURI: string
    }]
    stories: CommonIterableObject[]
    textObjects: [
        {
            language: string
            text: string
            type: string
        }
    ]
    thumbnail: Thumbnail
    title: string
    upc: string
    urls: Url[]
    variantDescription: string
    variants: []
}

export interface ComicDate {
    date: string
    type: string
}

export interface ComicPrice {
    price: number
    type: string
}

export interface CommonIterableObject {
    available: number
    collectionURI: string
    items: [{
        name: string
        resourceURI: string
    }]
    returned: number
}
export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Url {
    type: string;
    url: string;
}
