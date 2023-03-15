/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { ArtworkContextStructure, UserContextStructure, ArtworkContext } from '../../../core/context/artworks.context';
import { ARTWORKS } from '../../data/artmock';
import WorkPage from './work';
describe('Given WorkPage component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const handleLoad = jest.fn();
    const handleAdd = jest.fn();
    const reShuffleArtworks = jest.fn();
    describe('When it has been render', () => {
        test('Then the title should be in the screen', async () => {
            mockContext = {
                artworks: ARTWORKS,
                getAdmin: () => true,
                handleAdd,
                handleLoad,
                reShuffleArtworks,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <WorkPage></WorkPage>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
            const elementList = screen.getAllByRole('list');
            expect(elementList[0]).toBeInTheDocument();
        });
    });
});
