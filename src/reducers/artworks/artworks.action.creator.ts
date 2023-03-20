import { Artwork } from '../../features/models/artwork.model';
import { artworkActionTypes } from '../../reducers/artworks/artworks.action.types';

export type artworksAction = {
    type: string;
    payload: Array<Artwork> | Artwork | Artwork['id'] | Array<Array<Artwork>>;
};

export const artworksLoadCreator = (
    payload: Array<Array<Artwork>>
): artworksAction => ({
    type: artworkActionTypes.load,
    payload,
});

export const artworksAddCreator = (
    payload: Artwork
): artworksAction => ({
    type: artworkActionTypes.add,
    payload,
});

export const artworksUpdateCreator = (
    payload: Artwork
): artworksAction => ({
    type: artworkActionTypes.update,
    payload,
});

export const artworksDeleteCreator = (
    payload: Artwork['id']
): artworksAction => ({
    type: artworkActionTypes.delete,
    payload,
});

export const artworksReShuffleCreator = (
    payload: Artwork[][]
): artworksAction => ({
    type: artworkActionTypes.reshuffle,
    payload,
});

export const artworksDetailedCreator = (
    payload: Artwork
): artworksAction => ({
    type: artworkActionTypes.detailed,
    payload,
});
