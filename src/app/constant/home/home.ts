export interface Item {
    name: string;
    id: number;
    isValid?: boolean;
}

export interface ListOfItems {
    items: Item[]
};