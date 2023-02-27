/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../../core/context/artworks.context';
import Login from './login';
import { login } from '../../../config';
jest.mock('../../../config');

describe('Given "Login" component', () => {
    const handleUser = jest.fn();
    const handleAdmin = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;

    beforeEach(async () => {
        mockContext = {
            handleUser,
            handleAdmin,
        } as unknown as ArtworkContextStructure & UserContextStructure;
        await act(async () => {
            render(
                <ArtworkContext.Provider value={mockContext}>
                    <Router>
                        <Login></Login>
                    </Router>
                </ArtworkContext.Provider>
            );
        });
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: 'Log in',
            });
            expect(addTitle).toBeInTheDocument();
        });
    });

    describe('When data is provided', () => {
        const mockEmail = 'Test email';
        let inputElementTxt: HTMLElement;
        beforeEach(() => {
            inputElementTxt = screen.getByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            expect(inputElementTxt).toBeInTheDocument();
            userEvent.type(inputElementTxt, mockEmail);
            expect(inputElementTxt).toHaveValue(mockEmail);
        });
        test('Then buttons should be in the screen', async () => {
            (login as jest.Mock).mockResolvedValue({
                user: {
                    uid: '12345',
                },
            });
            const submitButton = screen.getByRole('button', {
                name: 'Sign in',
            });
            expect(submitButton).toBeInTheDocument();
            userEvent.click(submitButton);
            expect(login).toHaveBeenCalled();
        });
    });
});
