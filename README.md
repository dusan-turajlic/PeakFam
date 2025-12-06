# PeakFam - Macro and Calorie Tracking App

PeakFam is an open-source macro and calorie tracking application built with modern web technologies. It provides a simple, intuitive interface for tracking daily calorie intake and macronutrients.

## Features

- **Calorie & Macro Tracking**: Track daily calories, protein, carbohydrates, and fat intake
- **Food Database**: Search through thousands of food items via OpenFoodDex
- **Barcode Scanner**: Quickly add foods by scanning product barcodes
- **Quick Add**: Manually enter macros when food isn't in the database
- **Time-based Logging**: Organize food intake by hour throughout the day
- **Offline-First**: Local SQLite database for fast, offline search

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State** | Jotai |
| **Storage** | SQLite WASM (primary), IndexedDB, LocalStorage |
| **Testing** | Vitest, React Testing Library, Playwright |
| **Code Quality** | ESLint + Prettier |

## Architecture Overview

PeakFam follows a **layered MVC-inspired architecture**:

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

> 📖 **For detailed architecture documentation and coding guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)**

## Project Structure

```
PeakFam/
├── README.md              # This file
├── CONTRIBUTING.md        # Developer guide & architecture docs
├── LICENSE                # GPLv3 license
├── app/                   # React application
│   ├── src/
│   │   ├── atoms/         # Jotai state atoms
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── modals/        # TypeScript interfaces
│   │   ├── providers/     # Storage layer (SQLite, IndexedDB)
│   │   ├── services/      # Business logic & APIs
│   │   ├── utils/         # Utility functions
│   │   ├── views/         # Page components
│   │   └── App.tsx        # Root component
│   ├── public/            # Static assets
│   └── package.json       # App dependencies
└── e2e/                   # End-to-end tests (Playwright)
```

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PeakFam
   ```

2. **Install app dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Install e2e test dependencies**
   ```bash
   cd ../e2e
   npm install
   ```

### Development Commands

#### App Development

Navigate to the `app` directory:

```bash
cd app
```

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run unit tests**: `npm run test`
- **Run tests with UI**: `npm run test:ui`
- **Run tests with coverage**: `npm run test:coverage`
- **Lint code**: `npm run lint`
- **Fix linting issues**: `npm run lint:fix`
- **Format code**: `npm run format`

#### E2E Testing

Navigate to the `e2e` directory:

```bash
cd e2e
```

- **Run e2e tests**: `npm run test`
- **Run e2e tests with UI**: `npm run test:ui`
- **Run e2e tests in headed mode**: `npm run test:headed`
- **Debug e2e tests**: `npm run test:debug`
- **View test report**: `npm run report`

### Development Workflow

1. **Start the development server**:
   ```bash
   cd app
   npm run dev
   ```

2. **Run tests** (in a separate terminal):
   ```bash
   # Unit tests
   cd app
   npm run test
   
   # E2E tests
   cd e2e
   npm run test
   ```

3. **Code quality checks**:
   ```bash
   cd app
   npm run lint
   npm run format
   ```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our architecture guidelines
4. Run tests: `npm run test && npm run lint`
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push and submit a pull request

> 📖 **Before contributing, please read [CONTRIBUTING.md](./CONTRIBUTING.md)** for:
> - Detailed architecture documentation
> - Code organization guidelines (MVC pattern)
> - DRY principles and best practices
> - Layer responsibilities (Services vs Providers vs Components)
> - Testing strategy

## Code Architecture Summary

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Views** | Page composition | `Tracker.tsx` |
| **Components** | UI + user interaction | `FoodItem.tsx`, `DiaryTracker.tsx` |
| **Atoms** | Global state | `loggerDialog.ts` |
| **Services** | Business logic, API calls | `openFoodDex/index.ts` |
| **Providers** | Storage operations | `sqlite/index.ts` |
| **Models** | TypeScript interfaces | `IOpenFoodDexObject` |

**Golden Rule**: Components call Services → Services call Providers → Providers handle storage

## License
This project is licensed under the GNU General Public License v3.0 (GPLv3) - see the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
