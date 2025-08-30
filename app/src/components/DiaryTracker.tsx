import { dateTimeStartOfDay, USER_LOCAL_LANGUAGE } from "@/utils/browser";
import { createDateTimeUUID } from "@/utils/uuid";

function generateTimeStamps() {
    const today = dateTimeStartOfDay();
    const trackableHouers = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    const tracableTime = trackableHouers.map((time) => {
        const date = new Date(today.date);
        date.setHours(date.getHours() + time)
        return date
    })

    return tracableTime;
}

function DiaryTracker() {
    const times = generateTimeStamps();
    const today = dateTimeStartOfDay();
    return (
        <div className="flow-root">
            <ul role="list" className="my-4 mx-2">
                {times.map((time, idx) => {
                    const lable = time.toLocaleTimeString(USER_LOCAL_LANGUAGE, {
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
                                        className="absolute top-1 left-6 h-full w-0.2 bg-gray-500"
                                    />
                                ) : null}
                                <div className="relative flex space-x-1">
                                    <div>
                                        <span className="items-center min-w-13 text-center rounded-full bg-gray-500 px-2 py-1 text-xs font-medium text-white">
                                            {lable}
                                        </span>
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