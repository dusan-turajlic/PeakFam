import { MacroInput } from "@/components/ui";

export default function QuickAdd() {
    return (
        <div className="h-screen text-gray-200">
            <form>
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid w-full gap-x-2 gap-y-4 grid-cols-6 text-sm">
                        <MacroInput
                            label="Calories"
                            unit="kcal"
                            containerClassName="col-span-full"
                        />

                        <MacroInput
                            label="Carbs"
                            unit="g"
                            containerClassName="col-span-2 col-start-1"
                        />

                        <MacroInput
                            label="Protein"
                            unit="g"
                            containerClassName="col-span-2"
                        />

                        <MacroInput
                            label="Fat"
                            unit="g"
                            containerClassName="col-span-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
