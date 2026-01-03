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
}: Readonly<DayButtonProps>) {
    const dayAbbreviation = dateWithShortName(date);
    const dayNumber = date.getDate();

    return (
        <button
            id={id}
            data-testid={id}
            onClick={() => onClick(date)}
            className={`${[
                'w-16 h-16 rounded-full flex flex-col items-center justify-center font-medium mx-1 px-2 py-1 transition-all',
                'duration-200 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50',
                isSelected
                    ? 'bg-brand-gold text-surface-base border-2 border-brand-gold shadow-md'
                    : 'bg-surface-card text-white border-2 border-surface-elevated hover:border-brand-gold/50',
                isToday && !isSelected ? 'border-brand-gold' : ''
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
                <div className="w-1 h-1 bg-brand-gold rounded-full mt-1" />
            )}
        </button>
    );
};

export default DayButton;
