/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router';
import { ARTWORKS } from '../../../features/data/artmock';
import { ArtworkContextStructure, UserContextStructure, ArtworkContext } from '../../context/artworks.context';
import { App } from './app';
jest.mock('../../../config.ts')
describe('Given App component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const handleLoad = jest.fn();
    const handleAdd = jest.fn();
    const reShuffleArtworks = jest.fn();
    describe('When it has been render', () => {
        test('Then its child components should be render also with its title', async () => {
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
                            <App></App>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
            const elementHeader = screen.getByRole('heading', {
                name: 'Marina Labella',
            });
            const elementSubHeader = screen.getByRole('heading', {
                name: 'ILLUSTRATION',
            });
            expect(elementHeader).toBeInTheDocument();
            expect(elementSubHeader).toBeInTheDocument();
        });
    });
});
