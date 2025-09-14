import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { useAtom } from "jotai"
import { MagnifyingGlassIcon, QrCodeIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { loggerDialog } from "@/atoms/loggerDialog"
import { Fragment, useEffect, useRef } from "react"
import LauncherTabs from "./LauncherTabs"

const tabs = [
    { name: 'Scan', key: 'scan', icon: QrCodeIcon, current: false },
    { name: 'Search', key: 'search', icon: MagnifyingGlassIcon, current: false },
    // { name: 'AI', icon: ChatBubbleBottomCenterTextIcon, current: false },
    { name: 'Quick Add', key: 'quick-add', icon: SquaresPlusIcon, current: false }
]

export default function LoggerLauncher() {
    const [state, setState] = useAtom(loggerDialog)
    return (
        <>
            <div className="h-3"></div>
            <Button
                onClick={() => setState({ ...state, open: false })}
                className="relative flex bg-white rounded-full p-2 mx-2 mb-4">
                <XMarkIcon className="size-5 text-black" />
            </Button>
            <TabGroup defaultIndex={1}>
                <TabList className="flex w-auto space-x-2 text-white border-b border-gray-500 flex nowrap overflow-x-auto px-2 relative">
                    {tabs.map((tab) => (
                        <Tab as={Fragment} key={tab.name}>
                            {({ selected }) => (
                                <Button className={[
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
                    {tabs.map((tab) => (
                        <TabPanel key={tab.key}>
                            {LauncherTabs(tab.key)}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </>
    )
}