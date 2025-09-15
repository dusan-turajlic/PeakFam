import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog";
import { Button, DialogTitle } from "@headlessui/react";
import { QrCodeIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

export default function LoggerQuickActions() {
    const [state, setState] = useAtom(loggerDialog)
    return (
        <div className="p-4 min-h-[30vh]">
            <DialogTitle as="h3" className="text-base/7 font-medium text-white mb-4">
                Quick Actions
            </DialogTitle>
            <div className="flex gap-2">
                <Button
                    onClick={() => setState({ ...state, open: true, state: LoggerDialogState.LAUNCHER, metadata: { tab: 'scan' } })}
                    className="flex w-full items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                >
                    <QrCodeIcon aria-hidden="true" className="-mr-0.5 size-5" />
                    <span className="w-full text-center">Scan Item</span>
                </Button>
                <Button
                    onClick={() => setState({ ...state, open: true, state: LoggerDialogState.LAUNCHER, metadata: { tab: 'quick-add' } })}
                    className="flex w-full items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                >
                    <SquaresPlusIcon aria-hidden="true" className="-mr-0.5 size-5" />
                    <span className="w-full text-center">Quick Add</span>
                </Button>
            </div>
        </div>
    )
}