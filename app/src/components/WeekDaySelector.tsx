import { useState } from "react";
import DayButton from "./DayButton";
import { createDateUUID } from "@/utils/uuid";
import { dateTimeStartOfDay } from "@/utils/browser";


function generateInitialWeekDates() {
    const daysSet = new Set<Date>();
    const currentDate = dateTimeStartOfDay();

    for (let i = -4; i < 0; i++) {
        const date = dateTimeStartOfDay();
        date.setDate(currentDate.getDate() + i);
        daysSet.add(date);
    }

    daysSet.add(currentDate);

    for (let i = 1; i < 4; i++) {
        const date = dateTimeStartOfDay();
        date.setDate(currentDate.getDate() + i);
        daysSet.add(date);
    }

    return Array.from(daysSet);
}

const weekDates = generateInitialWeekDates();

const isSameDay = (date1: Date, date2: Date) => {
    return createDateUUID(date1) === createDateUUID(date2);
};

function WeekDaySelector() {
    const [selectedDate, setSelectedDate] = useState(dateTimeStartOfDay());

    return (
        <div className="w-full flex justify-center items-center bg-gray-900 p-4 overflow-x-auto">
            {weekDates.map((date) => {
                const id = createDateUUID(date);
                return (
                    <DayButton
                        key={id}
                        id={id}
                        date={date}
                        isSelected={isSameDay(date, selectedDate)}
                        isToday={isSameDay(date, dateTimeStartOfDay())}
                        onClick={setSelectedDate}
                    />
                )
            })}
        </div>
    );
};

export default WeekDaySelector;