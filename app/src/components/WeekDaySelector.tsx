import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DayButton from "./DayButton";
import useEmblaCarousel from 'embla-carousel-react'
import { dateTimeStartOfDay, type DateStartOfDay } from "@/utils/browser";

const addDays = (base: DateStartOfDay, delta: number): DateStartOfDay => {
    const d = new Date(base.date);
    d.setDate(d.getDate() + delta);
    return dateTimeStartOfDay(d);
};

const makeWeekAfter = (start: DateStartOfDay): DateStartOfDay[] => Array.from({ length: 7 }, (_, i) => addDays(start, i));
const makeWeekBefore = (start: DateStartOfDay): DateStartOfDay[] => Array.from({ length: 7 }, (_, i) => addDays(start, -(i + 1))).reverse();

function getWeekAfter(week: DateStartOfDay[]) {
    const last = week[week.length - 1];
    const start = addDays(last, 1);
    return makeWeekAfter(start);
};

function getWeekBefore(week: DateStartOfDay[]) {
    const first = week[0];
    const start = addDays(first, -7);
    return makeWeekBefore(start);
};


function WeekDaySelector() {
    const shouldAppendRef = useRef<string | null>(null);
    const today = useMemo(() => dateTimeStartOfDay(), []);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: false,
        containScroll: false,
        skipSnaps: false,
        startIndex: 1
    });
    const [selectedDate, setSelectedDate] = useState<DateStartOfDay>(today);
    const [weeks, setWeeks] = useState(() => {
        // Add days to today to get the start of the week and plus one so we get Monday and not Sunday
        const thisWeekStart = addDays(today, -(today.date.getDay() - 1));
        const thisWeek = makeWeekAfter(thisWeekStart);
        const nextWeek = getWeekAfter(thisWeek);
        const prevWeek = getWeekBefore(thisWeek);
        return [
            prevWeek,
            thisWeek,
            nextWeek
        ];
    });


    const appendNextWeek = useCallback(() => {
        setWeeks((curr) => {
            const lastWeek = curr[curr.length - 1];
            const nextWeek = getWeekAfter(lastWeek);
            return [...curr, nextWeek];
        });
    }, []);


    const prependPrevWeek = useCallback(() => {
        setWeeks((curr) => {
            const firstWeek = curr[0];
            const prevWeek = getWeekBefore(firstWeek);
            return [prevWeek, ...curr];
        });
    }, []);

    // Edge-detection: when you arrive at first/last snap, add a week
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const internalEngin = emblaApi.internalEngine();
            if (!internalEngin) return;

            const indexis = internalEngin.slideIndexes;

            if (internalEngin.index.get() === indexis.at(-1)) {
                shouldAppendRef.current = 'next';
                setTimeout(() => {
                    appendNextWeek();
                }, 400);
            }

            if (internalEngin.index.get() === indexis.at(0)) {
                setTimeout(() => {
                    prependPrevWeek();
                    emblaApi.scrollTo(indexis.at(1) ?? 1, true);
                }, 400);
                shouldAppendRef.current = 'prev';
            }
        };

        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, appendNextWeek, prependPrevWeek]);

    return (
        <div className="w-full">
            <div ref={emblaRef} role="listbox" className="bg-gray-800 overflow-hidden">
                <div className="flex">
                    {weeks.map((week) => (
                        <div key={week.map(({ uuid }) => uuid).join('-')} className="embla__container w-full flex justify-center items-center p-4">
                            {week.map((dates: DateStartOfDay) => (
                                <DayButton key={dates.uuid} id={dates.uuid} date={dates.date} isSelected={dates.uuid === selectedDate.uuid} isToday={dates.uuid === today.uuid} onClick={() => setSelectedDate(dates)} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeekDaySelector;