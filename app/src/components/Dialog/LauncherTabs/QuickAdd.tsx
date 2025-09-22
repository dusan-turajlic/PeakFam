export default function QuickAdd() {
    const inputContainerStyles = [
        "mt-2",
        "flex",
        "w-full",
        "py-2",
        "px-3",
        "pr-2",
        "items-center",
        "rounded-lg",
        "bg-gray-500",
        "outline-gray-200",
        "has-[input:focus-within]:outline-4",
        "has-[input:focus-within]:-outline-offset-4",
        "has-[input:focus-within]:outline-gray-200"
    ].join(' ')
    const inputStyles = [
        "w-full",
        "text-base",
        "focus:outline-none"
    ].join(' ')
    const inputUnitStyles = [
        "shrink-0",
        "text-center",
        "select-none",
        "m-auto",
        "pl-1"
    ].join(' ')
    return (
        <div className="h-screen text-gray-200">
            <form>
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid w-full gap-x-2 gap-y-4 grid-cols-6 text-sm">
                        <div className="col-span-full">
                            <label htmlFor="calories" className="block font-medium">
                                Calories
                            </label>
                            <div className={inputContainerStyles}>
                                <input
                                    id="calories"
                                    name="calories"
                                    type="number"
                                    autoComplete="off"
                                    className={inputStyles}
                                />
                                <div className={inputUnitStyles}>kcal</div>
                            </div>
                        </div>

                        <div className="col-span-2 col-start-1">
                            <label htmlFor="carbs" className="block font-medium">
                                Carbs
                            </label>
                            <div className={inputContainerStyles}>
                                <input
                                    id="carbs"
                                    name="carbs"
                                    type="number"
                                    autoComplete="off"
                                    className={inputStyles}
                                />
                                <div className={inputUnitStyles}>g</div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="protein" className="block font-medium">
                                Protein
                            </label>
                            <div className={inputContainerStyles}>
                                <input
                                    id="protein"
                                    name="protein"
                                    type="number"
                                    autoComplete="off"
                                    className={inputStyles}
                                />
                                <div className={inputUnitStyles}>g</div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="fat" className="block font-medium">
                                Fat
                            </label>
                            <div className={inputContainerStyles}>
                                <input
                                    id="fat"
                                    name="fat"
                                    type="number"
                                    autoComplete="off"
                                    className={inputStyles}
                                />
                                <div className={inputUnitStyles}>g</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}