import { Input } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { searchGenerator, type OpenFoodDexObject } from "@/services/api/openFoodDex";

// can you create a quick search component that has a debounce as you stop typing and then search the open food dex api
// and then display the results in a list

// can you make a simple debounce function
function debounceSearch<T extends (...args: unknown[]) => unknown>(func: T, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default function Search() {
    const [results, setResults] = useState<OpenFoodDexObject[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        let isCancelled = false;
        setIsSearching(true);
        setResults([]);

        const performSearch = async () => {
            try {
                for await (const result of searchGenerator(searchQuery)) {
                    if (isCancelled) break;

                    setResults(prev => [...prev, result]);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Search error:', error);
                }
            } finally {
                if (!isCancelled) {
                    setIsSearching(false);
                }
            }
        };

        performSearch();

        return () => {
            isCancelled = true;
        };
    }, [searchQuery]);

    return (
        <div className="overflow-auto">
            <div className="absolute bottom-3 left-0 right-0 z-10 bg-gradient-to-b  to-transparent">
                <Input
                    placeholder="Search" className="w-full px-4 py-2 border-gray-400 border-2 rounded-full relative"
                    onInput={(e) => {
                        const { target } = e as unknown as { target: HTMLInputElement | undefined };
                        if (!target) return;

                        if (target.value === '') {
                            setResults([]);
                            return;
                        }
                        debounceSearch(() => setSearchQuery(target.value), 300)();
                    }} />
            </div>
            <div className="relative top-0 h-screen text-white">
                {results.map((result) => (
                    <div className="flex" key={result.code}>
                        <p>{result.name} - {result.brand} - {result.creator}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}