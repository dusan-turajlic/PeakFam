import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Search, Clock, Apple, Pizza, Coffee, Settings, User, LayoutDashboard, LogOut } from 'lucide-react';

import { ModalSheet, ModalSheetPeek, ModalSheetContent } from '@/components/modalSheet';
import { Button } from '@/ui/button';

const meta: Meta<typeof ModalSheet> = {
    title: 'Components/ModalSheet',
    component: ModalSheet,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Controls if ModalSheetContent is expanded',
        },
        modal: {
            control: 'boolean',
            description: 'Show overlay when expanded (default: true)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ModalSheet>;

// Search - Persistent search bar that expands with results on focus
export const SearchStory: Story = {
    name: 'Search',
    render: function SearchDemo() {
        const [expanded, setExpanded] = useState(false);
        const [searchValue, setSearchValue] = useState('');

        const recentSearches = ['Chicken breast', 'Brown rice', 'Greek yogurt', 'Almonds'];
        const quickItems = [
            { icon: Apple, name: 'Apple', calories: 95 },
            { icon: Pizza, name: 'Pizza slice', calories: 285 },
            { icon: Coffee, name: 'Black coffee', calories: 5 },
        ];

        return (
            <div className="relative h-[600px] w-[400px] bg-background rounded-xl overflow-hidden border border-border">
                {/* App content behind the sheet */}
                <div className="p-4 space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Today's Log</h2>
                    <div className="space-y-3">
                        {['Breakfast - 450 cal', 'Lunch - 620 cal', 'Snack - 180 cal'].map((meal) => (
                            <div key={meal} className="p-4 bg-surface rounded-xl border border-border">
                                <p className="text-foreground">{meal}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center pt-4">
                        Focus on the search bar to expand!
                    </p>
                </div>

                {/* Persistent search sheet */}
                <ModalSheet open={expanded} onOpenChange={setExpanded} modal={false}>
                    {/* Always visible */}
                    <ModalSheetPeek>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search foods..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => setExpanded(true)}
                                className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                            />
                        </div>
                    </ModalSheetPeek>

                    {/* Expandable content */}
                    <ModalSheetContent>
                        {/* Recent searches */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">Recent</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map((item) => (
                                    <button
                                        key={item}
                                        className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground hover:bg-muted-foreground/20 transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick add items */}
                        <div className="space-y-3">
                            <span className="text-sm font-medium text-muted-foreground">Quick Add</span>
                            <div className="space-y-2">
                                {quickItems.map((item) => (
                                    <button
                                        key={item.name}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                                            <item.icon className="h-5 w-5 text-gold" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-foreground font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.calories} cal</p>
                                        </div>
                                        <Button size="sm" variant="secondary">Add</Button>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ModalSheetContent>
                </ModalSheet>
            </div>
        );
    },
};

// Menu - Trigger button opens menu items, closes on selection or drag
export const MenuStory: Story = {
    name: 'Menu',
    render: function MenuDemo() {
        const [showMenu, setShowMenu] = useState(false);

        const menuItems = [
            { icon: User, label: 'Profile', action: () => alert('Profile clicked') },
            { icon: LayoutDashboard, label: 'Dashboard', action: () => alert('Dashboard clicked') },
            { icon: Settings, label: 'Settings', action: () => alert('Settings clicked') },
            { icon: LogOut, label: 'Sign Out', action: () => alert('Sign out clicked'), destructive: true },
        ];

        const handleItemClick = (action: () => void) => {
            action();
            setShowMenu(false);
        };

        return (
            <div className="relative h-[500px] w-[400px] bg-background rounded-xl overflow-hidden border border-border">
                {/* App content */}
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground">Home</h2>
                        <Button
                            variant="icon"
                            size="icon"
                            onClick={() => setShowMenu(true)}
                        >
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-foreground-secondary">
                        Click the profile icon to open the menu sheet.
                    </p>
                    <div className="space-y-3 pt-4">
                        {['Welcome back!', 'You have 3 notifications', 'Daily goal: 80% complete'].map((text) => (
                            <div key={text} className="p-4 bg-surface rounded-xl border border-border">
                                <p className="text-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu sheet - only rendered when showMenu is true */}
                {showMenu && (
                    <ModalSheet open={true} onOpenChange={(open) => !open && setShowMenu(false)}>
                        <ModalSheetContent>
                            <div className="flex items-center gap-4 pb-2">
                                <div className="h-14 w-14 rounded-full bg-gold/20 flex items-center justify-center">
                                    <User className="h-7 w-7 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">John Doe</h3>
                                    <p className="text-sm text-foreground-secondary">john@example.com</p>
                                </div>
                            </div>

                            <div className="border-t border-border pt-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleItemClick(item.action)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${item.destructive
                                            ? 'hover:bg-destructive/10 text-destructive'
                                            : 'hover:bg-muted text-foreground'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </ModalSheetContent>
                    </ModalSheet>
                )}
            </div>
        );
    },
};
