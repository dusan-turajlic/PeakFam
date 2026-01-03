import { useState } from "react";
import { ModalSheet, ModalSheetPeek, ModalSheetContent, SearchInput, TabGroup, TabButton, Button } from "@peakfam/design-system";
import { Scan, ScanBarcode, Search } from "@peakfam/design-system/icons";
import WeekDaySelectorV2 from "@/components/WeekDaySelectorV2";
import TopNavigation from "@/components/TopNavigation";
import DiaryTrackerV2 from "@/components/DiaryTrackerV2";
import SearchResults from "@/components/SearchResults";
import MacroProgressBar from "@/components/MacroProgressBar";

const SCAN_TAB_INDEX = 0;
const SEARCH_TAB_INDEX = 1;

export default function TrackerV2() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [defaultTab, setDefaultTab] = useState(SEARCH_TAB_INDEX);
    const [activeTab, setActiveTab] = useState(defaultTab);

    const [searchQuery, setSearchQuery] = useState("");


    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    const tabs = [
        {
            index: SCAN_TAB_INDEX,
            tab: <TabButton icon={<Scan className="h-4 w-4" />}>Scan</TabButton>,
            content: <div>Scan</div>,
        },
        {
            index: SEARCH_TAB_INDEX,
            tab: <TabButton icon={<Search className="h-4 w-4" />}>Search</TabButton>,
            content: <SearchResults query={searchQuery} />,
        },
    ].sort((a, b) => a.index - b.index);

    return (
        <div className={`flex flex-col gap-1 max-w-96 m-auto ${isExpanded ? 'overflow-hidden h-screen' : 'min-h-screen'}`}>
            <TopNavigation />
            <WeekDaySelectorV2 />
            <MacroProgressBar />
            <DiaryTrackerV2 />
            <span className="h-30" />
            <ModalSheet open={isExpanded} onOpenChange={(open) => {
                setIsExpanded(open)
                if (!open) {
                    setDefaultTab(SEARCH_TAB_INDEX);
                    setActiveTab(SEARCH_TAB_INDEX);
                }
            }}
                modal={false}>
                <ModalSheetPeek>
                    {activeTab === SEARCH_TAB_INDEX && (
                        <div className="py-2">
                            <SearchInput
                                placeholder="Search for a food..."
                                onFocus={() => setIsExpanded(true)}
                                onSearch={setSearchQuery}
                                action={!isExpanded && (
                                    <Button
                                        onClick={() => {
                                            // Set the default tab to scan so that its selected
                                            setDefaultTab(SCAN_TAB_INDEX);
                                            // Sets the active tab so that the code automaticly handles it like it was just changed to scan
                                            setActiveTab(SCAN_TAB_INDEX);
                                            // Opens the modal sheet
                                            setIsExpanded(true);
                                        }}
                                        variant="icon"
                                        size="icon-sm"
                                        aria-label="Scan barcode">
                                        <ScanBarcode className="h-4 w-4" />
                                    </Button>
                                )}
                            />
                        </div>
                    )}
                </ModalSheetPeek >

                <ModalSheetContent>
                    {isExpanded && (
                        <TabGroup
                            defaultTab={defaultTab}
                            tabs={tabs}
                            onTabChange={handleTabChange}
                        />
                    )}
                </ModalSheetContent>
            </ModalSheet >
        </div >
    );
}
