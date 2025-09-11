import { dateWithShortName } from "@/utils/browser";

interface DayButtonProps {
    id: string;
    date: Date;
    isSelected: boolean;
    isToday: boolean;
    onClick: (date: Date) => void;
}

function DayButton({
    id,
    date,
    isSelected,
    isToday,
    onClick
}: DayButtonProps) {
    const dayAbbreviation = dateWithShortName(date);
    const dayNumber = date.getDate();

    return (
        <button
            id={id}
            data-testid={id}
            onClick={() => onClick(date)}
            className={`${[
                'w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-medium mx-1 px-2 py-1 transition-all',
                'duration-200 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50',
                isSelected ? 'bg-blue-500 border-2 border-blue-300 shadow-md' : 'bg-gray-800 border-2 border-gray-600 hover:border-gray-500',
                isToday && !isSelected ? 'border-yellow-400' : ''
            ].join(' ')}`}
            aria-label={`Select ${dayAbbreviation}`}
        >
            <span className="text-xs font-semibold leading-none">
                {dayAbbreviation}
            </span>

            <span className="text-sm font-bold leading-none mt-1 min-w-6 text-center">
                {dayNumber}
            </span>

            {isToday && (
                <div className="w-1 h-1 bg-yellow-400 rounded-full mt-1" />
            )}
        </button>
    );
};

export default DayButton;