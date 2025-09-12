import { loggerDialog } from "@/atoms/loggerDialog";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { SquaresPlusIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

function FoodLoggerDialog() {
    const [open, setOpen] = useAtom(loggerDialog)

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
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
              w-screen min-h-48 bg-white/5 p-6 backdrop-blur-2xl shadow-lg
              duration-200 ease-out
              data-[closed]:translate-y-full data-[closed]:opacity-0
            "
                >
                    <DialogTitle as="h3" className="text-base/7 font-medium text-white mb-4">
                        Quick Actions
                    </DialogTitle>
                    <div className="flex gap-2">
                        <Button
                            className="flex w-full items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                        >
                            <QrCodeIcon aria-hidden="true" className="-mr-0.5 size-5" />
                            <span className="w-full text-center">Scan Item</span>
                        </Button>
                        <Button
                            className="flex w-full items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                        >
                            <SquaresPlusIcon aria-hidden="true" className="-mr-0.5 size-5" />
                            <span className="w-full text-center">Quick Add</span>
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default FoodLoggerDialog;