/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { USER } from '../../../features/data/usermock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { ClientContact } from './client.contact';

describe('Given "ClientContact" component', () => {
    const handleLoadUsers = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;
    beforeEach(async () => {
        mockContext = {
            users: [USER],
            handleLoadUsers,
        } as unknown as ArtworkContextStructure & UserContextStructure;
        await act(async () => {
            render(
                <ArtworkContext.Provider value={mockContext}>
                    <ClientContact></ClientContact>
                </ArtworkContext.Provider>
            );
        });
    });
    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: 'Received Messages',
            });
            const nameLabel = screen.getByText(USER.name);
            const emailLabel = screen.getByText(USER.email);
            expect(addTitle).toBeInTheDocument();
            expect(nameLabel).toBeInTheDocument();
            expect(emailLabel).toBeInTheDocument();
        });
    });
});
