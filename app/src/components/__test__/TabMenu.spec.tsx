import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { BrowserRouter } from "react-router-dom";
import TabMenu from "../TabMenu";


const TabMenuWithRouter = () => (
    <BrowserRouter>
        <TabMenu />
    </BrowserRouter>
);

describe('TabMenu', () => {
    it('renders all navigation items', () => {
        render(<TabMenuWithRouter />);

        // Check that all navigation items are present
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Food Log')).toBeInTheDocument();
        expect(screen.getByText('Strategy')).toBeInTheDocument();
        expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('renders the add button', () => {
        render(<TabMenuWithRouter />);

        const addButton = screen.getByRole('button');
        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveAttribute('type', 'button');
    });

    it('renders navigation links', () => {
        render(<TabMenuWithRouter />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4); // Dashboard, Food Log, Strategy, More

        // Check that links have correct href attributes
        expect(links[0]).toHaveAttribute('href', '/'); // Dashboard
        expect(links[1]).toHaveAttribute('href', '/'); // Food Log
        expect(links[2]).toHaveAttribute('href', '/'); // Strategy
        expect(links[3]).toHaveAttribute('href', '/more'); // More
    });
});
