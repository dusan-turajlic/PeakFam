import { useState } from "react";
import { ModalSheet, ModalSheetPeek, ModalSheetContent, SearchInput, TabGroup, TabButton } from "@peakfam/design-system";
import { Scan, Search as SearchIcon } from "lucide-react";
import WeekDaySelectorV2 from "@/components/WeekDaySelectorV2";
import TopNavigation from "@/components/TopNavigation";
import DiaryTrackerV2 from "@/components/DiaryTrackerV2";

export default function TrackerV2() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col gap-4 min-h-screen">
            <div>
                <TopNavigation />
            </div>
            <WeekDaySelectorV2 />
            <DiaryTrackerV2 />
            <ModalSheet open={isExpanded} onOpenChange={setIsExpanded} modal={false}>
                <ModalSheetPeek>
                    <div className="py-2">
                        <SearchInput
                            placeholder="Search for a food..."
                            onFocus={() => setIsExpanded(true)}
                        />
                    </div>
                </ModalSheetPeek>

                <ModalSheetContent>
                    <TabGroup
                        tabs={[
                            {
                                tab: <TabButton icon={<Scan className="h-4 w-4" />}>Scan</TabButton>,
                                content: <div>Scan</div>,
                            },
                            {
                                tab: <TabButton icon={<SearchIcon className="h-4 w-4" />}>Search</TabButton>,
                                content: <div>Search</div>,
                            },
                        ]}
                    />
                </ModalSheetContent>
            </ModalSheet>
        </div>
    );
}
