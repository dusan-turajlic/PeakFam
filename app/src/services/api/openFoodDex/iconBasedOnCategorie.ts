import iconMapping from "@/assets/icon_mapping.json";

export function getIconBasedOnCategories(categories: string[]) {
    const noLocaleCategories = categories.map(category => category.toLowerCase().split(':').at(-1));
    const matchingIcon = iconMapping.find(icon => icon.relatedCategories.some(category => noLocaleCategories.includes(category)));
    const icon = matchingIcon?.icon;
    if (!icon) {
        return "icons8-grocery-shelf";
    }
    return icon;
}