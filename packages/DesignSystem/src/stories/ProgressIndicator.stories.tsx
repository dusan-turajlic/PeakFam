import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressIndicator } from '@/components/progressIndicator';

const meta = {
    title: 'Components/ProgressIndicator',
    component: ProgressIndicator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'number', min: 0, max: 5000 },
            description: 'Current progress value',
        },
        max: {
            control: { type: 'number', min: 1, max: 5000 },
            description: 'Maximum value',
        },
        size: {
            control: 'select',
            options: ['xl', 'lg', 'md', 'sm'],
            description: 'Size variant',
        },
    },
    args: {
        value: 1918,
        max: 2400,
        size: 'lg',
    },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default interactive story
export const Default: Story = {
    args: {
        value: 1918,
        max: 2400,
        size: 'lg',
    },
};

// All Size Variants
export const Sizes: Story = {
    render: () => (
        <div className="space-y-8">
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Extra Large</p>
                <ProgressIndicator value={1918} max={2400} size="xl" />
            </div>
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Large (Default)</p>
                <ProgressIndicator value={1918} max={2400} size="lg" />
            </div>
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Medium (No Text)</p>
                <ProgressIndicator value={1918} max={2400} size="md" />
            </div>
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Small (Thin Bar)</p>
                <ProgressIndicator value={1918} max={2400} size="sm" />
            </div>
        </div>
    ),
};

// Progress States
export const ProgressStates: Story = {
    render: () => (
        <div className="space-y-6">
            <p className="text-sm text-foreground-secondary">
                Progress indicators with dynamic text color. Text changes color based on fill level.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
                <ProgressIndicator value={0} max={2400} />
                <ProgressIndicator value={500} max={2400} />
                <ProgressIndicator value={1200} max={2400} />
                <ProgressIndicator value={1918} max={2400} />
                <ProgressIndicator value={2400} max={2400} />
            </div>
        </div>
    ),
};

// Small Bars Row
export const SmallBars: Story = {
    render: () => (
        <div className="space-y-4 w-64">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Thin Progress Bars</p>
            <div className="space-y-3">
                <ProgressIndicator value={0} max={100} size="sm" />
                <ProgressIndicator value={25} max={100} size="sm" />
                <ProgressIndicator value={50} max={100} size="sm" />
                <ProgressIndicator value={75} max={100} size="sm" />
                <ProgressIndicator value={100} max={100} size="sm" />
            </div>
        </div>
    ),
};

// Extra Large
export const ExtraLarge: Story = {
    args: {
        value: 1918,
        max: 2400,
        size: 'xl',
    },
};

// Medium (No Text)
export const Medium: Story = {
    args: {
        value: 1918,
        max: 2400,
        size: 'md',
    },
};

// Small (Thin)
export const Small: Story = {
    args: {
        value: 1918,
        max: 2400,
        size: 'sm',
    },
};

