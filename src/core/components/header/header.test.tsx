/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { Header } from './header';
jest.mock('../../../config.ts');
describe('Given Header component', () => {
    describe('When renders without current User', () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router>
                        <Header>
                            <></>
                        </Header>
                    </Router>
                );
            });
        });
        test('Then elements should be in the screen', () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Marina Labella',
            });
            const elementSubtitle = screen.getByRole('heading', {
                name: 'ILLUSTRATION',
            });
            expect(elementTitle).toBeInTheDocument();
            expect(elementSubtitle).toBeInTheDocument();
        });
    });
});
