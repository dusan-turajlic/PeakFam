import { render, screen } from "@testing-library/react";
import { expect, it, describe, beforeEach } from "vitest";
import FoodLoggerDialog from "../Dialog/FoodLoggerDialog";
import { createStore, Provider } from "jotai";
import { loggerDialog } from "@/atoms/loggerDialog";

const FoodLoggerDialogWithProvider = ({ store }: { store: ReturnType<typeof createStore> }) => (
    <Provider store={store}>
        <FoodLoggerDialog />
    </Provider>
);

describe('FoodLoggerDialog', () => {
    let store: ReturnType<typeof createStore>;
    beforeEach(() => {
        store = createStore()
        store.set(loggerDialog, true)
    });
    it('renders dialog when open', async () => {
        render(<FoodLoggerDialogWithProvider store={store} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders dialog title', () => {
        render(<FoodLoggerDialogWithProvider store={store} />);

        expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument();
    });

    it('renders action buttons', () => {
        render(<FoodLoggerDialogWithProvider store={store} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);

        const [scanButton, quickAddButton] = buttons;
        // Check button content
        expect(scanButton).toHaveTextContent('Scan Item');
        expect(quickAddButton).toHaveTextContent('Quick Add');
    });

    it('does not render when closed', () => {
        store.set(loggerDialog, false)
        render(<FoodLoggerDialogWithProvider store={store} />);

        expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });
});
