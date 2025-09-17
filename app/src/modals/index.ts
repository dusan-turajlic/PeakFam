export interface IOpenFoodDexObject {
    i: string;              // code
    n?: string;             // name
    b?: string;             // brand
    cat: string[];          // categories
    k?: number;             // kcal
    s?: number;             // serving_size
    u?: string;             // serving_unit
    er?: number;            // fiber
    c?: number;             // carbs
    f?: number;             // fat
    p?: number;             // protein
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
