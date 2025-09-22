import { Input } from "@headlessui/react";
import { useRef, useState } from "react";
import { searchGenerator } from "@/services/api/openFoodDex";
import FoodItem from "@/components/FoodItem";
import { getIconBasedOnCategories } from "@/services/api/openFoodDex/iconBasedOnCategorie";
import type { IOpenFoodDexObject } from "@/modals";
import Spinner from "@/components/Spinner";

function debounceSearch<T extends (...args: any[]) => any>(func: T, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

async function triggerSearch(
    searchQuery: string,
    setResults: (results: IOpenFoodDexObject[]) => void,
    setIsSearching: (isSearching: boolean) => void
): Promise<void> {
    const results = new Map<string, IOpenFoodDexObject>();
    for await (const result of searchGenerator(searchQuery)) {
        results.set(result.code, result);
    }

    setResults(Array.from(results.values()));
    setIsSearching(false);
}

const debouncedSearch = debounceSearch<typeof triggerSearch>(triggerSearch, 500);

export default function Search() {
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<IOpenFoodDexObject[]>([]);
    const resultRef = useRef<HTMLOListElement>(null);

    return (
        <div className="overflow-auto">
            <div className="absolute left-0 bottom-0 right-0 pb-3 px-3 z-10 bg-gradient-to-t from-gray-900 from-75% to-transparent">
                <Input
                    placeholder="Search" className="w-full px-4 py-2 border-gray-400 border-2 rounded-full relative"
                    onInput={(e) => {
                        if (!resultRef.current) return;
                        if (!(e.target instanceof HTMLInputElement)) return;
                        if (e.target.value === '') {
                            setResults([]);
                            return;
                        }

                        setIsSearching(true);
                        void debouncedSearch(e.target.value, setResults, setIsSearching);
                    }} />
            </div>
            <div className="relative top-0 h-[80vh] text-white mb-20 overflow-y-auto">
                <ol ref={resultRef} className="divide-y divide-gray-100">
                    {results.map((result) => (
                        <li key={result.code}>
                            <FoodItem foodIcon={getIconBasedOnCategories(result.categories ?? [])} {...result} />
                        </li>
                    ))}
                    {isSearching && (
                        <li className="text-gray-400 flex justify-center items-center h-full">
                            <Spinner show={isSearching} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}