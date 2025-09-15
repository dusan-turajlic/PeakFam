export interface IOpenFoodDexObject {
    code: string;
    name?: string;
    brand?: string;
    creator?: string;
    main_category?: string;
    path: string;
    categories?: string[];
    macros?: {
        kcal?: number;
        serving_size?: string;
        p: number;
        f?: number;
        c?: number;
    };
}