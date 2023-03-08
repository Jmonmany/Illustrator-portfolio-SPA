/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../../core/context/artworks.context';
import { USER } from '../../data/usermock';
import Contact from './contact';
describe('Given "Contact" component', () => {
    describe('When Admin is false', () => {
        let mockContext: ArtworkContextStructure & UserContextStructure;
        beforeEach(async () => {
            mockContext = {
                getAdmin: () => false,
                currentUser: USER,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Contact></Contact>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test('Then section with role article should be in screen', () => {
            const div = screen.getByRole('article');
            expect(div).toBeInTheDocument();
        });
        test('Then the component ArtistContact should be rendered', () => {
            const title = screen.getByRole('heading', {
                name: `Let's talk`,
            });
            expect(title).toBeInTheDocument();
        });
    });
    describe('When Admin is true', () => {
        let mockContext: ArtworkContextStructure & UserContextStructure;
        const handleLoadUsers = jest.fn();
        beforeEach(async () => {
            mockContext = {
                getAdmin: () => true,
                users: [USER],
                handleLoadUsers,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Contact></Contact>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test('Then the component ClientContact should be rendered', () => {
            const title = screen.getByRole('heading', {
                name: 'Received Messages',
            });
            expect(title).toBeInTheDocument();
        });
    });
});
