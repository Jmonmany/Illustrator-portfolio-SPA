import { mockArtwork1, mockArtwork2 } from '../../hooks/artworks/testing.mock';
import { Artwork } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import * as ac from './artworks.action.creator';
import { artworksReducer } from './artworks.reducer';
import {
    ARTWORK,
    ARTWORK2,
    ARTWORK3,
    ARTWORKS,
} from '../../features/data/artmock';

describe('Given the reducer', () => {
    let state: Array<Array<Artwork>>;
    let action: artworksAction;

    describe('When the action type is "artworks@load"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [[], [], []];
            action = ac.artworksLoadCreator(ARTWORKS);
            const result = artworksReducer(state, action);
            expect(result).toEqual(ARTWORKS);
        });
    });

    describe('When the action type is "artworks@add"', () => {
        test('Then it should return the state with the data added', () => {
            state = [[mockArtwork1], [ARTWORK3], [ARTWORK3]];
            action = ac.artworksAddCreator(mockArtwork2);
            const result = artworksReducer(state, action);
            expect(result).toEqual([
                [mockArtwork1],
                [ARTWORK3, mockArtwork2],
                [ARTWORK3],
            ]);
        });
    });

    describe('When the action type is "artworks@update"', () => {
        test('Then it should return the state with th data updated', () => {
            const updateartwork = {
                ...ARTWORK,
                title: 'Pepe',
            };
            state = ARTWORKS;
            action = ac.artworksUpdateCreator(updateartwork);
            const result = artworksReducer(state, action);
            expect(result).toEqual([[updateartwork], [ARTWORK2], [ARTWORK3]]);
        });
    });

    describe('When the action type is "artworks@delete"', () => {
        test('Then it should return the state without the data deleted', () => {
            state = ARTWORKS;
            action = ac.artworksDeleteCreator(ARTWORK.id);
            const result = artworksReducer(state, action);
            expect(result).toEqual([[], [ARTWORK2], [ARTWORK3]]);
        });
    });

    describe('When the action type is "artworks@reshuffle"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [];
            action = ac.artworksReShuffleCreator([mockArtwork1, mockArtwork2]);
            const result = artworksReducer(state, action);
            expect(result).toEqual([mockArtwork1, mockArtwork2]);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = [];
            action = { type: 'Bad', payload: 'Test' };
            const result = artworksReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
