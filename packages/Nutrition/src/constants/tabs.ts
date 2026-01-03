import { ScanBarcode, Search, LayoutGrid, type LucideIcon } from "@ydin/design-system/icons";

export interface TabConfig {
    name: string;
    key: string;
    icon: LucideIcon;
    current: boolean;
}

export const LAUNCHER_TABS: TabConfig[] = [
    { name: 'Scan', key: 'scan', icon: ScanBarcode, current: false },
    { name: 'Search', key: 'search', icon: Search, current: false },
    { name: 'Quick Add', key: 'quick-add', icon: LayoutGrid, current: false }
];

export const DEFAULT_TAB_INDEX = 1; // Search tab

