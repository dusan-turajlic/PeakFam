import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { ModalSheet, ModalSheetContent, ModalSheetPeek } from './modalSheet'

// Test content identifiers
const PLAIN_CONTENT = 'plain-content'
const PEEK_CONTENT = 'peek-content'
const SHEET_CONTENT = 'sheet-content'

describe('ModalSheet', () => {
    // Test 1: Plain children are not supported
    it('should not render plain children (unsupported usage)', () => {
        render(
            <ModalSheet open={false} modal={false}>
                <span data-testid={PLAIN_CONTENT}>Plain text</span>
            </ModalSheet>
        )

        expect(screen.queryByTestId(PLAIN_CONTENT)).not.toBeInTheDocument()
    })

    // Test 2: ModalSheetContent renders when open is true
    it('should render ModalSheetContent when open is true', () => {
        render(
            <ModalSheet open={true} modal={false}>
                <ModalSheetContent>
                    <span data-testid={SHEET_CONTENT}>Content inside sheet</span>
                </ModalSheetContent>
            </ModalSheet>
        )

        expect(screen.getByTestId(SHEET_CONTENT)).toBeInTheDocument()
        expect(screen.getByTestId(SHEET_CONTENT)).toHaveTextContent('Content inside sheet')
    })

    // Test 3: ModalSheetPeek + ModalSheetContent visibility
    it('should show ModalSheetContent only when open and always show ModalSheetPeek', () => {
        const onOpenChange = vi.fn()

        // Render with open=true
        const { rerender } = render(
            <ModalSheet open={true} onOpenChange={onOpenChange} modal={false}>
                <ModalSheetPeek>
                    <span data-testid={PEEK_CONTENT}>Peek content</span>
                </ModalSheetPeek>
                <ModalSheetContent>
                    <span data-testid={SHEET_CONTENT}>Expandable content</span>
                </ModalSheetContent>
            </ModalSheet>
        )

        // Both should be visible when open=true
        expect(screen.getByTestId(PEEK_CONTENT)).toBeInTheDocument()
        expect(screen.getByTestId(PEEK_CONTENT)).toHaveTextContent('Peek content')
        expect(screen.getByTestId(SHEET_CONTENT)).toBeInTheDocument()
        expect(screen.getByTestId(SHEET_CONTENT)).toHaveTextContent('Expandable content')

        // Rerender with open=false
        rerender(
            <ModalSheet open={false} onOpenChange={onOpenChange} modal={false}>
                <ModalSheetPeek>
                    <span data-testid={PEEK_CONTENT}>Peek content</span>
                </ModalSheetPeek>
                <ModalSheetContent>
                    <span data-testid={SHEET_CONTENT}>Expandable content</span>
                </ModalSheetContent>
            </ModalSheet>
        )

        // Peek should still be visible
        expect(screen.getByTestId(PEEK_CONTENT)).toBeInTheDocument()

        // Content should be hidden when open=false
        expect(screen.queryByTestId(SHEET_CONTENT)).not.toBeVisible();
    })
})

