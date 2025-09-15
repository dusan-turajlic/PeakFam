import { atom } from "jotai";

export const LoggerDialogState = {
    DEFAULT: "DEFAULT",
    LAUNCHER: "LAUNCHER",
}

interface LoggerDialogMetadata {
    tab?: string;
    id?: string;
}

export const loggerDialog = atom({
    open: false,
    state: LoggerDialogState.DEFAULT,
    metadata: {} as LoggerDialogMetadata,
});