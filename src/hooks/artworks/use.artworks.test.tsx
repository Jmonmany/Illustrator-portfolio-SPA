/* eslint-disable no-empty-pattern */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    mockArtworks,
    mockArtwork1,
    mockArtwork2,
    mockAddArtwork,
    mockUpdateArtwork,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import { ArtworksRepo } from '../../core/services/art-repo/art.repo';
import { useArtworks } from './use.artworks';
import { Artwork } from '../../features/models/artwork.model';
import * as debug from '../../tools/debug';
import { ARTWORKS } from '../../features/data/artmock';
import { useEffect } from 'react';

jest.mock('firebase/storage');
jest.mock('../../config');
jest.mock('../../core/services/art-repo/art.repo.ts');
ArtworksRepo.prototype.load = jest.fn();
ArtworksRepo.prototype.create = jest.fn();
ArtworksRepo.prototype.update = jest.fn();
ArtworksRepo.prototype.delete = jest.fn();
describe(`Given useArtworkss (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                files: [
                    {
                        name: 'test-file',
                    },
                ],
            },
        };
        TestComponent = () => {
            const {
                reShuffleArtworks,
                handleFile,
                handleDetailed,
                handleAdd,
                getStatus,
                getArtworks,
                handleLoad,
                handleUpdate,
                handleDelete,
            } = useArtworks();

            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddArtwork)}>
                        Add
                    </button>
                    <button onClick={() => handleUpdate(mockUpdateArtwork)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockArtwork2)}>
                        Delete
                    </button>
                    <button
                        onClick={() =>
                            reShuffleArtworks([mockArtwork1, mockArtwork2])
                        }
                    >
                        reShuffle
                    </button>
                    <button onClick={() => handleDetailed(mockArtwork1)}>
                        Detail
                    </button>
                    <button
                        onClick={() =>
                            handleFile(
                                event,
                                mockArtwork2.id,
                                mockArtwork2.column
                            )
                        }
                    >
                        File
                    </button>
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getArtworks()[0].map((artwork: Artwork) => (
                                    <li key={artwork.id}>{artwork.title}</li>
                                ))}
                            </ul>
                            <ul>
                                {getArtworks()[1].map((artwork: Artwork) => (
                                    <li key={artwork.id}>{artwork.title}</li>
                                ))}
                            </ul>
                            <ul>
                                {getArtworks()[2].map((artwork: Artwork) => (
                                    <li key={artwork.id}>{artwork.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };
        await act(async () => {
            render(<TestComponent />);
        });
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(ArtworksRepo.prototype.create).toHaveBeenCalled();
            const result = await screen.findAllByText(mockAddArtwork.title);
            expect(result[1]).toBeInTheDocument();
        });

        test('Then its function handleLoad should be add places to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(mockArtwork1.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(mockArtwork2.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(ArtworksRepo.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdateArtwork.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(ArtworksRepo.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(mockArtwork2.title)
            ).toBeInTheDocument();

            await expect(
                async () => await screen.findByText(mockArtwork1.title)
            ).rejects.toThrowError();
        });
        test('Then its function reShuffle should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[4]);
            expect(
                await screen.findByText(mockArtwork1.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(mockArtwork2.title)
            ).toBeInTheDocument();
        });
        test('Then its function Details should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[5]);
            expect(
                await screen.findByText(mockArtwork1.title)
            ).toBeInTheDocument();
        });
        test('Then its function handleFile should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[6]);
            await waitFor(() => {
                expect(ArtworksRepo.prototype.update).toHaveBeenCalled();
            });
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[1]);
            expect(ArtworksRepo.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[2]);
            expect(ArtworksRepo.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[3]);
            expect(ArtworksRepo.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
describe(`Given useArtworkss`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        const event = {
            preventDefault: jest.fn(),
            target: {},
        };
        TestComponent = () => {
            const { handleFile, handleLoad } = useArtworks();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button
                        onClick={() =>
                            handleFile(
                                event,
                                mockArtwork2.id,
                                mockArtwork2.column
                            )
                        }
                    >
                        File
                    </button>
                </>
            );
        };
        await act(async () => {
            render(<TestComponent />);
        });
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When there is NO file`, () => {
        test('Then its function handleFile should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith(
                    'Any file selected'
                );
            });
        });
    });
});
