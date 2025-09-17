import { loggerDialog } from "@/atoms/loggerDialog"
import type { Product } from "@/modals"
import { searchByBarcode } from "@/services/api/openFoodDex"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"

export default function FoodItem() {
    const { metadata } = useAtomValue(loggerDialog)
    const [foodItem, setFoodItem] = useState<Product | null>(null)

    useEffect(() => {
        if (metadata?.barcode) {
            searchByBarcode(metadata.barcode).then((foodItem) => {
                setFoodItem(foodItem)
            })
        }
    }, [metadata])

    return (
        <div className="p-4 text-white">
            {foodItem && Object.entries(foodItem).map(([key, value]) => (
                <div key={key}>{key}: {JSON.stringify(value)}</div>
            ))}
        </div>
    )
}