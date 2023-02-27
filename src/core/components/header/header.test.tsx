/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router';
import { USER } from '../../../features/data/usermock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { Header } from './header';
jest.mock('../../../config.ts');
describe('Given Header component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const handleCurrentUser = jest.fn();
    describe('When renders without current User', () => {
        beforeEach(async () => {
            mockContext = {
                handleCurrentUser,
                currentUser: {},
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Header>
                                <></>
                            </Header>
                        </Router>
                    </ArtworkContext.Provider>
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
