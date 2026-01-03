import { Input } from "@headlessui/react";
import { useRef, useState } from "react";
import { search } from "@/services/api/openFoodDex";
import FoodItem from "@/components/FoodItem";
import { getIconBasedOnCategories } from "@/services/api/openFoodDex/iconBasedOnCategorie";
import type { IOpenFoodDexObject } from "@/modals";
import { LoadingSpinner } from "@/components/ui";
import { useSetAtom } from "jotai";
import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog";
import { debounce } from "@/utils/debounce";

async function triggerSearch(
    searchQuery: string,
    setResults: (results: IOpenFoodDexObject[]) => void,
    setIsSearching: (isSearching: boolean) => void
): Promise<void> {
    const results = new Map<string, IOpenFoodDexObject>();
    const searchResults = await search(searchQuery);
    for (const result of searchResults) {
        results.set(result.code, result);
    }

    setResults(Array.from(results.values()));
    setIsSearching(false);
}

const debouncedSearch = debounce<typeof triggerSearch>(triggerSearch, 500);

export default function Search() {
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<IOpenFoodDexObject[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const resultRef = useRef<HTMLOListElement>(null);
    const setDialogState = useSetAtom(loggerDialog);

    const handleFoodItemClick = (code: string) => {
        setDialogState((prev) => ({
            ...prev,
            state: LoggerDialogState.FOOD_ITEM,
            metadata: { ...prev.metadata, barcode: code }
        }));
    };

    return (
        <div className="overflow-auto">
            <div className="absolute left-0 bottom-0 right-0 pb-3 px-3 z-10 bg-gradient-to-t from-surface-base from-75% to-transparent">
                <Input
                    placeholder="Search for a food"
                    className="w-full px-4 py-2 bg-surface-elevated border-surface-elevated border-2 rounded-full text-white placeholder:text-gray-400 focus:border-brand-gold focus:outline-none transition-colors"
                    onInput={(e) => {
                        if (!resultRef.current) return;
                        if (!(e.target instanceof HTMLInputElement)) return;

                        const value = e.target.value;
                        setSearchQuery(value);

                        if (value === '') {
                            setResults([]);
                            return;
                        }

                        setIsSearching(true);
                        void debouncedSearch(value, setResults, setIsSearching);
                    }} />
            </div>
            <div className="relative top-0 h-[80vh] text-white mb-20 overflow-y-auto">
                <ol ref={resultRef} className="divide-y divide-surface-elevated">
                    {searchQuery && results.map((result) => (
                        <li key={result.code}>
                            <FoodItem
                                foodIcon={getIconBasedOnCategories(result.categories ?? [])}
                                onClick={() => handleFoodItemClick(result.code)}
                                {...result}
                            />
                        </li>
                    ))}
                    {searchQuery && isSearching && (
                        <li className="text-gray-400 flex justify-center items-center h-full py-8">
                            <LoadingSpinner show={isSearching} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}
