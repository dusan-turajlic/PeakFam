import { useState } from "react";
import { ProgressIndicator } from "@ydin/design-system";

interface MacroData {
    value: number;
    max: number;
}

interface MacroState {
    calories: MacroData;
    protein: MacroData;
    fat: MacroData;
    carbs: MacroData;
}

const macroMapping: Record<keyof MacroState, { icon: string; color?: string }> = {
    calories: {
        icon: "🔥",
    },
    protein: {
        icon: "P",
        color: "bg-green-700",
    },
    fat: {
        icon: "F",
        color: "bg-red-900",
    },
    carbs: {
        icon: "C",
        color: "bg-blue-700",
    },
}

export default function MacroProgressBar() {
    // State for macro values - will later be fetched from state/local database
    const [macros] = useState<MacroState>({
        calories: { value: 2500, max: 2500 },
        protein: { value: 85, max: 200 },
        fat: { value: 50, max: 90 },
        carbs: { value: 120, max: 225 },
    });

    return (
        <div className="flex flex-col gap-2 px-4 my-4 sticky top-10 z-10">
            <div className="grid grid-cols-4 gap-2">
                {Object.entries(macros).map(([key, macroData]) => {
                    const { icon, color = undefined } = macroMapping[key as keyof MacroState];
                    const { value, max } = macroData as MacroData;
                    return (
                        <div key={`${key}-${icon}-${value}-${max}`} className="flex flex-col gap-1">
                            <div className="flex items-center">
                                <span className="text-[0.625rem] text-foreground-secondary">{icon}</span>
                                <span className="text-[0.625rem] text-foreground-secondary ml-1">
                                    {value} / {max}
                                </span>
                            </div>
                            <ProgressIndicator
                                value={value}
                                max={max}
                                size="sm"
                                color={color}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

