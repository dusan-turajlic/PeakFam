import { useState } from "react";
import DayButton from "./DayButton";
import { createDateUUID } from "@/utils/uuid";
import { dateTimeStartOfDay } from "@/utils/browser";


function generateInitialWeekDates() {
    const currentDate = dateTimeStartOfDay();

    const nextDay = dateTimeStartOfDay();
    nextDay.setDate(currentDate.getDate() + 1);

    const previousDay = dateTimeStartOfDay();
    previousDay.setDate(currentDate.getDate() - 1);

    const nextDays = Array.from({ length: 4 }, (_, i) => {
        const date = dateTimeStartOfDay();
        date.setDate(nextDay.getDate() + i);
        return date;
    });

    const previousDays = Array.from({ length: 4 }, (_, i) => {
        const date = dateTimeStartOfDay();
        date.setDate(previousDay.getDate() - i);
        return date;
    });

    return Array.from(new Set([...previousDays, currentDate, ...nextDays]));
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