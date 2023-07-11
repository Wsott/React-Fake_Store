export interface CardData {
    id: number;
    name: string;
    image: string;
    creationDate: string | null;
    updateDate: string | null;
}

export interface ProductsData {
    filter: string | null;
}