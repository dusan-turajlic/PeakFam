import DiaryTracker from "@/components/DiaryTracker";
import WeekDaySelector from "@/components/WeekDaySelector";

export default function Tracker() {
    return (
        <div>
            <WeekDaySelector />
            <DiaryTracker />
        </div>
    )
}