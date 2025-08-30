# PeakFam - Macro and Calorie Tracking App

PeakFam is an open-source macro and calorie tracking application built with modern web technologies. It provides a simple, intuitive interface for tracking daily calorie intake and macronutrients.

## Features

- **Calorie Tracking**: Easy-to-use interface for tracking daily calorie consumption
- **Macro Tracking**: Monitor protein, carbohydrates, and fat intake
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **State Management**: Efficient state management using Jotai
- **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Jotai
- **Testing**: 
  - Unit/Integration: Vitest with React Testing Library
  - E2E: Playwright
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm

## Project Structure

```
PeakFam/
├── README.md          # This file
├── app/               # React application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   ├── package.json   # App dependencies
│   └── ...           # App configuration files
└── e2e/              # End-to-end tests
    ├── tests/         # Playwright test files
    ├── package.json   # E2E dependencies
    └── ...           # E2E configuration files
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

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests to ensure everything works:
   ```bash
   # In app directory
   npm run test
   npm run lint
   
   # In e2e directory
   npm run test
   ```
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## Testing Strategy

- **Unit Tests**: Test individual components and functions using Vitest
- **Integration Tests**: Test component interactions and state management
- **E2E Tests**: Test complete user workflows using Playwright

## Code Style

- **ESLint**: Enforces code quality and consistency
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Provides type safety and better developer experience

## License
This project is licensed under the GNU General Public License v3.0 (GPLv3) - see the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
