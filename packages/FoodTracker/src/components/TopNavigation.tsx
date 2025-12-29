import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ModalSheet, ModalSheetContent } from '@peakfam/design-system'

const navigation = [
    { name: 'Copy day', href: '#' },
    { name: 'Make day my meal plan', href: '#' },
    { name: 'Clear day', href: '#' },
    { name: 'Export day', href: '#' },
]

export default function TopNavigation() {
    const [showMenu, setShowMenu] = useState(false)

    const handleItemClick = (href: string) => {
        console.log('Navigate to:', href)
        setShowMenu(false)
    }

    return (
        <div className="mx-auto max-w-7xl px-2">
            <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                        onClick={() => setShowMenu(true)}
                        className="group relative inline-flex items-center justify-center rounded-md p-2 text-white/60 hover:bg-surface-elevated hover:text-brand-gold"
                    >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="block size-6" />
                    </button>
                </div>
            </div>

            <ModalSheet open={showMenu} onOpenChange={setShowMenu}>
                <ModalSheetContent>
                    <div className="space-y-1">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleItemClick(item.href)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-white/70 hover:bg-surface-elevated hover:text-brand-gold"
                            >
                                <span className="font-medium">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </ModalSheetContent>
            </ModalSheet>
        </div>
    )
}
