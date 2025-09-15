import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Spinner({ show }: { show: boolean }) {
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div role="status" aria-live="polite" className="flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <span className="sr-only" > Loading…</span>
      </div>
    </Transition >
  );
}
