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

export interface Product {
    code: string;
    product_name?: string;
    product_name_en?: string;
    brands?: string;
    quantity?: string;
    packaging?: string;
    categories?: string;
    labels?: string;
    image_url?: string;
    image_small_url?: string;
    image_thumb_url?: string;
    ingredients_text?: string;
    ingredients_text_en?: string;
    nutriments?: {
        energy_100g?: number;
        energy_unit?: string;
        fat_100g?: number;
        fat_unit?: string;
        "saturated-fat_100g"?: number;
        "sugars_100g"?: number;
        salt_100g?: number;
        [key: string]: number | string | undefined;
    };
    nutrition_grades?: string;
    nutriscore_data?: {
        // optional, when included
        energy_points?: number;
        sugars_points?: number;
        // etc
        [key: string]: any;
    };
    [key: string]: any;  // to allow for other fields not explicitly listed
}

export interface ProductResponse {
    status: number;
    status_verbose: string;
    code: string;
    product?: Product;
}
