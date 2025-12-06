import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { useAtom } from "jotai"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { loggerDialog } from "@/atoms/loggerDialog"
import { Fragment, useState } from "react"
import LauncherTabs from "./LauncherTabs"
import { LAUNCHER_TABS, DEFAULT_TAB_INDEX } from "@/constants/tabs"

export default function LoggerLauncher() {
    const [state, setState] = useAtom(loggerDialog)
    const { metadata } = state
    const tabIndex = LAUNCHER_TABS.findIndex(tab => tab.key === metadata?.tab)
    const [selectedIndex, setSelectedIndex] = useState(tabIndex === -1 ? DEFAULT_TAB_INDEX : tabIndex)
    
    return (
        <>
            <div className="h-3"></div>
            <Button
                onClick={() => setState({ ...state, open: false })}
                className="relative flex bg-white rounded-full p-2 mx-2 mb-4">
                <XMarkIcon className="size-5 text-black" />
            </Button>
            <TabGroup selectedIndex={selectedIndex}>
                <TabList className="flex w-auto space-x-2 text-white border-b border-gray-500 flex nowrap overflow-x-auto px-2 relative">
                    {LAUNCHER_TABS.map((tab, index) => (
                        <Tab as={Fragment} key={tab.name}>
                            {({ selected }) => (
                                <Button onClick={() => setSelectedIndex(index)} className={[
                                    'flex items-center flex-row flex-nowrap whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium text-center scrollbar-hide',
                                    selected
                                        ? 'border-blue-400'
                                        : 'border-transparent',
                                ].join(' ')}>
                                    <tab.icon
                                        aria-hidden="true"
                                        className="mr-2 -ml-0.5 size-5"
                                    />
                                    <span>{tab.name}</span>
                                </Button>
                            )}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-2 mx-4 max-h-full overflow-y-auto">
                    {LAUNCHER_TABS.map((tab) => (
                        <TabPanel key={tab.key}>
                            {LauncherTabs(tab.key)}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </>
    )
}
