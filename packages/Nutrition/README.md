# Ydin Nutrition

A macro and calorie tracking application built with React, TypeScript, and modern web technologies.

> Part of the [Ydin](../../README.md) suite of health and wellness apps.

## Features

- **Calorie & Macro Tracking** - Track daily calories, protein, carbohydrates, and fat
- **Food Database** - Search thousands of food items via OpenFoodDex
- **Barcode Scanner** - Quickly add foods by scanning product barcodes
- **Quick Add** - Manually enter macros when food isn't in the database
- **Time-based Logging** - Organize food intake by hour throughout the day
- **Offline-First** - Local SQLite database for fast, offline search

## Development

### Commands

Run from this directory (`packages/Nutrition`):

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run E2E tests
pnpm test:e2e

# Lint code
pnpm lint
```

Or from the root directory:

```bash
pnpm dev           # Starts this app
pnpm build         # Builds all packages including this one
```

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State** | Jotai |
| **Storage** | SQLite WASM (primary), IndexedDB, LocalStorage |
| **Testing** | Vitest, React Testing Library |

## Architecture

This app follows a **layered MVC-inspired architecture**:

```
┌─────────────────────────────────────────────────────────┐
│  Views (src/views/)        │  Page-level components    │
├─────────────────────────────────────────────────────────┤
│  Components (src/components/) │  Reusable UI blocks    │
├─────────────────────────────────────────────────────────┤
│  Atoms (src/atoms/)        │  Global state (Jotai)     │
├─────────────────────────────────────────────────────────┤
│  Services (src/services/)  │  Business logic & APIs    │
├─────────────────────────────────────────────────────────┤
│  Providers (src/providers/)│  Storage abstraction      │
├─────────────────────────────────────────────────────────┤
│  Models (src/modals/)      │  TypeScript interfaces    │
└─────────────────────────────────────────────────────────┘
```

**Key Principle**: Each layer only communicates with adjacent layers. Components use services, services use providers—never skip layers.

### Layer Summary

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Views** | Page composition | `Tracker.tsx` |
| **Components** | UI + user interaction | `FoodItem.tsx`, `DiaryTracker.tsx` |
| **Atoms** | Global state | `loggerDialog.ts` |
| **Services** | Business logic, API calls | `openFoodDex/index.ts` |
| **Providers** | Storage operations | `sqlite/index.ts` |
| **Models** | TypeScript interfaces | `IOpenFoodDexObject` |

## Folder Structure

```
src/
├── atoms/              # Jotai state atoms
├── components/         # Reusable UI components
│   ├── Dialog/         # Modal/dialog components
│   └── ui/             # Small UI primitives
├── hooks/              # Custom React hooks
├── modals/             # TypeScript interfaces (models)
├── providers/          # Storage layer (SQLite, IndexedDB)
├── services/           # Business logic & APIs
├── utils/              # Utility functions
├── views/              # Page-level components
└── constants.ts        # App-wide constants
```

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed architecture documentation, coding guidelines, and testing strategy.
