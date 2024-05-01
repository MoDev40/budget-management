import { z } from "zod";
import { Params } from "./globalInterface";

export const categorySchema = z.object({
    name:z.string(),
    userId:z.string().readonly(),
})

export type CategoryInputs = z.infer<typeof categorySchema>

export interface UpdateCategory extends Params {
    data:CategoryInputs
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