// Global interfaces

import { Params } from "./globalInterface";


// Transaction interfaces

// create transaction input types




// Budge Interfaces

// budge inputs


// category interface

export interface CategoryInputs {
    name:string;
    userId:string;
}

export interface UpdateCategory extends Params{
    data:CategoryInputs
}

export interface DeleteCategory extends Params{
    userId:string
}

export interface Category { 
    id: string;
    name: string;
    userId: string;
    price: number | null;
}

export interface Categories {
    categories:Category[]
}