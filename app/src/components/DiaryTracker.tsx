import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog";
import { dateTimeStartOfDay, USER_LOCAL_LANGUAGE } from "@/utils/browser";
import { createDateTimeUUID } from "@/utils/uuid";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

function generateTimeStamps() {
    const today = dateTimeStartOfDay();
    const trackableHouers = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    const tracableTime = trackableHouers.map((time) => {
        const date = new Date(today.date);
        date.setHours(time)
        return date
    })

    return tracableTime;
}

function DiaryTracker() {
    const [state, setState] = useAtom(loggerDialog);
    const times = generateTimeStamps();
    const today = dateTimeStartOfDay();
    return (
        <div className="flow-root">
            <ul role="list" className="my-4 mx-2">
                {times.map((time, idx) => {
                    const label = time.toLocaleTimeString(USER_LOCAL_LANGUAGE, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                    const uuid = createDateTimeUUID(time, today.uuid)
                    return (
                        <li key={uuid}>
                            <div className="relative pb-5">
                                {idx !== times.length - 1 ? (
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-1 left-6 h-full w-px bg-gray-500"
                                    />
                                ) : null}
                                <div className="relative flex space-x-1">
                                    <div className="flex space-x-1">
                                        <span className="items-center justify-center min-w-13 text-center rounded-full bg-gray-500 px-2 py-1 mr-2 text-xs font-medium text-white">
                                            {label}
                                        </span>
                                        <Button onClick={() => { setState({ ...state, open: true, state: LoggerDialogState.LAUNCHER, metadata: { id: uuid } }) }} className="flex items-center justify-center self-center text-center rounded-full bg-gray-500 w-5 h-5 font-medium text-white">
                                            <PlusIcon aria-hidden="true" className="size-3" />
                                        </Button>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        {/** Food content goes here */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DiaryTracker;