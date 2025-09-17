import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useAtom } from "jotai";
import LoggerQuickActions from "./LoggerQuickActions";
import LoggerLauncher from "@/components/Dialog/LoggerLauncher";
import FoodItem from "@/components/Dialog/FoodItem";

function FoodLoggerDialog() {
    const [state, setState] = useAtom(loggerDialog)
    const { state: dialogState } = state

    return (
        <Dialog
            open={state.open}
            onClose={() => setState({ ...state, open: false })}
            as="div"
            className="relative z-50 text-white"
        >
            {/* Backdrop */}
            <DialogBackdrop className="fixed inset-0 bg-black/50 data-[closed]:opacity-0 transition-opacity duration-100" />

            {/* Bottom sheet container */}
            <div className="fixed inset-x-0 bottom-0 z-50 overscroll-contain touch-pan-y">
                <DialogPanel
                    transition
                    className="
              w-screen max-h-screen bg-white/5 backdrop-blur-2xl shadow-lg
              duration-200 ease-out
              data-[closed]:translate-y-full data-[closed]:opacity-0
            "
                >
                    {dialogState === LoggerDialogState.DEFAULT && <LoggerQuickActions />}
                    {dialogState === LoggerDialogState.LAUNCHER && <LoggerLauncher />}
                    {dialogState === LoggerDialogState.FOOD_ITEM && <FoodItem />}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default FoodLoggerDialog;