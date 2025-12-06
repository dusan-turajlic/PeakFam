import { 
    QrCodeIcon, 
    MagnifyingGlassIcon, 
    SquaresPlusIcon 
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export interface TabConfig {
    name: string;
    key: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    current: boolean;
}

export const LAUNCHER_TABS: TabConfig[] = [
    { name: 'Scan', key: 'scan', icon: QrCodeIcon, current: false },
    { name: 'Search', key: 'search', icon: MagnifyingGlassIcon, current: false },
    { name: 'Quick Add', key: 'quick-add', icon: SquaresPlusIcon, current: false }
];

export const DEFAULT_TAB_INDEX = 1; // Search tab

