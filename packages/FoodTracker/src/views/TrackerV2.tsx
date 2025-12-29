import WeekDaySelectorV2 from "@/components/WeekDaySelectorV2";
import Example from "@/components/tmp";

export default function TrackerV2() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Example />
            </div>
            <WeekDaySelectorV2 />
        </div>
    )
}