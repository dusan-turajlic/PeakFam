import QuickAdd from "@/components/Dialog/LauncherTabs/QuickAdd"
import Scanner from "@/components/Dialog/LauncherTabs/Scanner"
import Search from "@/components/Dialog/LauncherTabs/Search"

export default function LauncherTabs(key: string) {
    switch (key) {
        case 'scan':
            return <Scanner />
        case 'search':
            return <Search />
        case 'quick-add':
            return <QuickAdd />
    }
}