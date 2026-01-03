import { atom } from "jotai";

export const LoggerDialogState = {
    DEFAULT: "DEFAULT",
    LAUNCHER: "LAUNCHER",
    FOOD_ITEM: "FOOD_ITEM",
}

interface LoggerDialogMetadata {
    tab?: string;
    id?: string;
    barcode?: string;
}

export const loggerDialog = atom({
    open: false,
    state: LoggerDialogState.DEFAULT,
    metadata: {} as LoggerDialogMetadata,
});