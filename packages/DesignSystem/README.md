# Ydin Design System

A shared component library for the Ydin suite of applications. Built with React, TypeScript, and Tailwind CSS.

> Part of the [Ydin](../../README.md) suite of health and wellness apps.

## Components

| Component | Description |
|-----------|-------------|
| `DayButton` | Day selector button for date navigation |
| `FoodCard` | Card component for displaying food items |
| `IconButton` | Button with icon support |
| `ModalSheet` | Bottom sheet modal component |
| `ProgressIndicator` | Progress bar/indicator |
| `RippleEffect` | Material-style ripple effect |
| `SearchInput` | Search input field with styling |
| `TabButton` | Individual tab button |
| `TabGroup` | Tab navigation group |

## Usage

Install the design system in your package:

```json
{
  "dependencies": {
    "@ydin/design-system": "workspace:*"
  }
}
```

Import components:

```tsx
import { DayButton, ModalSheet, TabGroup } from '@ydin/design-system';
import '@ydin/design-system/styles';
```

## Development

### Commands

Run from this directory (`packages/DesignSystem`):

```bash
# Start Storybook
pnpm storybook

# Build the library
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

Or from the root directory:

```bash
pnpm storybook    # Starts Storybook
pnpm build        # Builds all packages including this one
```

### Storybook

This package uses Storybook for component development and documentation. Stories are located in `src/stories/`.

```bash
pnpm storybook
```

Visit `http://localhost:6006` to view the component library.

## Adding New Components

1. Create your component in `src/components/`:

```tsx
// src/components/myComponent.tsx
export function MyComponent({ children }: { children: React.ReactNode }) {
  return <div className="...">{children}</div>;
}
```

2. Export it from `src/index.ts`:

```tsx
export { MyComponent } from './components/myComponent';
```

3. Add a story in `src/stories/`:

```tsx
// src/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../components/myComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;

export const Default: StoryObj<typeof MyComponent> = {
  args: {
    children: 'Hello World',
  },
};
```

4. Build to update the dist:

```bash
pnpm build
```

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + TypeScript |
| **Styling** | Tailwind CSS |
| **Documentation** | Storybook |
| **Build** | Vite + vite-plugin-dts |

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for coding guidelines and best practices.
