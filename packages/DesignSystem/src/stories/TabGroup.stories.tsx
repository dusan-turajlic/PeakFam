import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scan, Search, Plus, Settings, User, Bell, Home, Star, Heart } from 'lucide-react';

import { TabGroup } from '@/components/tabGroup';
import { TabButton } from '@/components/tabButton';

const meta = {
    title: 'Components/TabGroup',
    component: TabGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultTab: {
            control: { type: 'number', min: 0, max: 4 },
            description: 'Index of the initially active tab',
        },
    },
} satisfies Meta<typeof TabGroup>;

export default meta;
type Story = StoryObj<typeof TabGroup>;

// Default interactive story
export const Default: Story = {
    args: {
        tabs: [
            {
                tab: <TabButton icon={<Scan className="h-4 w-4" />}>Scan</TabButton>,
                content: <p className="text-foreground">Scan mode: Use your camera to quickly scan food barcodes.</p>,
            },
            {
                tab: <TabButton icon={<Search className="h-4 w-4" />}>Search</TabButton>,
                content: <p className="text-foreground">Search mode: Find foods by typing their name.</p>,
            },
            {
                tab: <TabButton icon={<Plus className="h-4 w-4" />}>History</TabButton>,
                content: <p className="text-foreground">History: View your recently scanned or searched foods.</p>,
            },
        ],
        defaultTab: 0,
    },
};

// With Icons
export const WithIcons: Story = {
    render: () => (
        <div className="space-y-8 w-[500px]">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tabs with Icons</p>
                <p className="text-sm text-foreground-secondary">
                    Animated tabs with a sliding gold indicator that smoothly transitions between tabs using Framer Motion.
                </p>
            </div>
            <TabGroup
                tabs={[
                    {
                        tab: <TabButton icon={<Scan className="h-4 w-4" />}>Scan</TabButton>,
                        content: <p className="text-foreground">Scan mode: Use your camera to quickly scan food barcodes.</p>,
                    },
                    {
                        tab: <TabButton icon={<Search className="h-4 w-4" />}>Search</TabButton>,
                        content: <p className="text-foreground">Search mode: Find foods by typing their name.</p>,
                    },
                    {
                        tab: <TabButton icon={<Plus className="h-4 w-4" />}>History</TabButton>,
                        content: <p className="text-foreground">History: View your recently scanned or searched foods.</p>,
                    },
                ]}
            />
        </div>
    ),
};

// Text Only
export const TextOnly: Story = {
    render: () => (
        <div className="space-y-8 w-[500px]">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Text Only Tabs</p>
                <p className="text-sm text-foreground-secondary">
                    Simple text tabs without icons.
                </p>
            </div>
            <TabGroup
                tabs={[
                    {
                        tab: <TabButton>Overview</TabButton>,
                        content: <p className="text-foreground">Overview content: Get a quick summary of your daily progress.</p>,
                    },
                    {
                        tab: <TabButton>Details</TabButton>,
                        content: <p className="text-foreground">Details content: Dive deeper into your nutrition breakdown.</p>,
                    },
                    {
                        tab: <TabButton>Analytics</TabButton>,
                        content: <p className="text-foreground">Analytics content: View trends and patterns over time.</p>,
                    },
                ]}
            />
        </div>
    ),
};

// Two Tabs
export const TwoTabs: Story = {
    render: () => (
        <div className="space-y-8 w-[400px]">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Two Tabs</p>
            </div>
            <TabGroup
                tabs={[
                    {
                        tab: <TabButton icon={<User className="h-4 w-4" />}>Login</TabButton>,
                        content: <p className="text-foreground">Login form would go here.</p>,
                    },
                    {
                        tab: <TabButton icon={<Plus className="h-4 w-4" />}>Register</TabButton>,
                        content: <p className="text-foreground">Registration form would go here.</p>,
                    },
                ]}
            />
        </div>
    ),
};

// Many Tabs
export const ManyTabs: Story = {
    render: () => (
        <div className="space-y-8 w-[600px]">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Many Tabs</p>
            </div>
            <TabGroup
                tabs={[
                    {
                        tab: <TabButton icon={<Home className="h-4 w-4" />}>Home</TabButton>,
                        content: <p className="text-foreground">Home content.</p>,
                    },
                    {
                        tab: <TabButton icon={<Star className="h-4 w-4" />}>Favorites</TabButton>,
                        content: <p className="text-foreground">Favorites content.</p>,
                    },
                    {
                        tab: <TabButton icon={<Heart className="h-4 w-4" />}>Liked</TabButton>,
                        content: <p className="text-foreground">Liked content.</p>,
                    },
                    {
                        tab: <TabButton icon={<Bell className="h-4 w-4" />}>Notifications</TabButton>,
                        content: <p className="text-foreground">Notifications content.</p>,
                    },
                    {
                        tab: <TabButton icon={<Settings className="h-4 w-4" />}>Settings</TabButton>,
                        content: <p className="text-foreground">Settings content.</p>,
                    },
                ]}
            />
        </div>
    ),
};

// Default to Second Tab
export const DefaultSecondTab: Story = {
    args: {
        tabs: [
            {
                tab: <TabButton>First</TabButton>,
                content: <p className="text-foreground">First tab content.</p>,
            },
            {
                tab: <TabButton>Second</TabButton>,
                content: <p className="text-foreground">Second tab content - this is the default.</p>,
            },
            {
                tab: <TabButton>Third</TabButton>,
                content: <p className="text-foreground">Third tab content.</p>,
            },
        ],
        defaultTab: 1,
    },
};

// Rich Content
export const RichContent: Story = {
    render: () => (
        <div className="space-y-8 w-[500px]">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Rich Content</p>
                <p className="text-sm text-foreground-secondary">
                    Tabs can contain any React content.
                </p>
            </div>
            <TabGroup
                tabs={[
                    {
                        tab: <TabButton icon={<Star className="h-4 w-4" />}>Stats</TabButton>,
                        content: (
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-foreground">Daily Statistics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-2xl font-bold text-gold">1,847</p>
                                        <p className="text-sm text-muted-foreground">Calories</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-2xl font-bold text-gold">142g</p>
                                        <p className="text-sm text-muted-foreground">Protein</p>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        tab: <TabButton icon={<User className="h-4 w-4" />}>Profile</TabButton>,
                        content: (
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-foreground">User Profile</h4>
                                <p className="text-foreground-secondary">Manage your account settings and preferences.</p>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    ),
};
