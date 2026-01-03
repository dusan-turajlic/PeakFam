export type IOpenFoodDexArray = [
    // code
    string?,
    // name
    string?,
    // brand
    string?,
    // categories
    string[]?,
    // serving_size
    number?,
    // serving_unit
    string?,
    // fiber
    number?,
    // carbs
    number?,
    // fat
    number?,
    // protein
    number?,
];

export interface IOpenFoodDexObject {
    code: string;
    name: string;
    brand: string;
    categories: string[];
    kcal?: number;
    serving_size?: number;
    serving_unit?: string;
    fiber?: number;
    carbs?: number;
    fat?: number;
    protein?: number;
}


export interface Nutriment {
    [key: string]: number | string | undefined;
}

export interface MacroValues {
    energy_kcal?: number | null;
    energy_kj?: number | null;
    carbohydrates?: number | null;
    fat?: number | null;
    proteins?: number | null;
    sugars?: number | null;
    fiber?: number | null;
    salt?: number | null;
}

export interface Product {
    code: string;
    product_name?: string;
    brands?: string;
    main_category?: string;
    macros?: {
        serving_size?: number | null;
        serving_quantity?: number | null;
        serving_unit?: string | null;
        serving?: MacroValues;
        per100g?: MacroValues;
    };
    image_url?: string;
    [key: string]: unknown;
}

export interface ProductResponse {
    status: number;
    status_verbose: string;
    code: string;
    product?: Product;
}
