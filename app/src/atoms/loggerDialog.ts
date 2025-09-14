import { atom } from "jotai";

export const LoggerDialogState = {
    DEFAULT: "DEFAULT",
    LAUNCHER: "LAUNCHER",
}

export const loggerDialog = atom({
    open: false,
    state: LoggerDialogState.DEFAULT,
    metadata: {},
});