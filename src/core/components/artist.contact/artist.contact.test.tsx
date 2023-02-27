/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { USER } from '../../../features/data/usermock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { ArtistContact } from './artist.contact';
import { useEffect } from 'react';

describe('Given "ArtistContact" component', () => {
    describe('When we have actually current user', () => {
        const handleAddUser = jest.fn();
        let mockContext: ArtworkContextStructure & UserContextStructure;
        beforeEach(async () => {
            mockContext = {
                admin: false,
                currentUser: USER,
                handleAddUser,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <ArtistContact></ArtistContact>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        const mockPhone = '12345';
        const mockAddress = 'Test address';
        const mockSubject = 'Test subject';
        const mockDescription = 'Test description';
        let inputElementsTxt: Array<HTMLElement>;
        beforeEach(() => {
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            const title = screen.getByRole('heading', {
                name: `Let's talk`,
            });
            expect(title).toBeInTheDocument();
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            expect(inputElementsTxt[2]).toBeInTheDocument();
            expect(inputElementsTxt[3]).toBeInTheDocument();
            expect(inputElementsTxt[4]).toBeInTheDocument();
            expect(inputElementsTxt[5]).toBeInTheDocument();
            userEvent.type(inputElementsTxt[2], mockPhone);
            userEvent.type(inputElementsTxt[3], mockAddress);
            userEvent.type(inputElementsTxt[4], mockSubject);
            userEvent.type(inputElementsTxt[5], mockDescription);
            expect(inputElementsTxt[2]).toHaveValue(mockPhone);
            expect(inputElementsTxt[3]).toHaveValue(mockAddress);
            expect(inputElementsTxt[4]).toHaveValue(mockSubject);
            expect(inputElementsTxt[5]).toHaveValue(mockDescription);
        });
        test('Then the button should be in the screen', () => {
            const submitButton = screen.getByRole('button', { name: 'Submit' });
            expect(submitButton).toBeInTheDocument();
            userEvent.click(submitButton);
            expect(handleAddUser).toHaveBeenCalled();
        });
    });
});
describe('When we have not current user', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    beforeEach(async () => {
        mockContext = {
            admin: false,
            currentUser: {},
        } as unknown as ArtworkContextStructure & UserContextStructure;
        await act(async () => {
            render(
                <ArtworkContext.Provider value={mockContext}>
                    <Router>
                        <ArtistContact></ArtistContact>
                    </Router>
                </ArtworkContext.Provider>
            );
        });
    });
    test('Then navigate should be used', () => {
        const navigate = jest.fn();
        const currentUser = {};
        renderHook(() =>
            useEffect(() => {
                if (Object.keys(currentUser).length === 0) {
                    navigate('/login');
                }
            }, [])
        );
        expect(navigate).toHaveBeenCalledWith('/login');
    });
});
