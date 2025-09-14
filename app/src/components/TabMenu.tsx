import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog";
import {
    PlusIcon,
    EllipsisHorizontalCircleIcon,
    RectangleGroupIcon,
    ScaleIcon,
    FireIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";

export default function TabMenu() {
    const [state, setState] = useAtom(loggerDialog);
    return (
        <>
            <div className="h-20" />
            <div className="fixed bottom-0 left-0 right-0 h-20">
                <nav className="w-full bg-gray-800 border-t border-gray-500 text-white flex justify-center items-center pb-6 pt-3 px-3">
                    <ul className="grid grid-cols-5 gap-4 w-full justify-center items-center text-center text-xs relative">
                        <li>
                            <Link to="/" className="ui-selected:text-white ui-not-selected:text-neutral-400 focus:outline-none">
                                <div className="flex flex-col items-center gap-1">
                                    <RectangleGroupIcon className="h-7 w-7" aria-hidden="true" />
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                        </li>

                        <li>
                            <Link to="/" className="ui-selected:text-white ui-not-selected:text-neutral-400 focus:outline-none">
                                <div className="flex flex-col items-center gap-1">
                                    <FireIcon className="h-7 w-7" aria-hidden="true" />
                                    <span>Food Log</span>
                                </div>
                            </Link>
                        </li>

                        <li>
                            <button type="button" onClick={() => setState({ ...state, open: true, state: LoggerDialogState.DEFAULT })} className="block -mt-8 rounded-full bg-white w-16 h-16 flex items-center justify-center m-auto shadow-lg ring-1 ring-neutral-300">
                                <PlusIcon className="h-8 w-8 text-black" aria-hidden="true" />
                            </button>
                        </li>

                        <li>
                            <Link to="/" className="ui-selected:text-white ui-not-selected:text-neutral-400 focus:outline-none">
                                <div className="flex flex-col items-center gap-1">
                                    <ScaleIcon className="h-7 w-7" aria-hidden="true" />
                                    <span>Strategy</span>
                                </div>
                            </Link>
                        </li>

                        <li>
                            <Link to="/more" className="ui-selected:text-white ui-not-selected:text-neutral-400 focus:outline-none">
                                <div className="flex flex-col items-center gap-1">
                                    <EllipsisHorizontalCircleIcon className="h-7 w-7" aria-hidden="true" />
                                    <span>More</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
