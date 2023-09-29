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

export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Url {
    type: string;
    url: string;
}
