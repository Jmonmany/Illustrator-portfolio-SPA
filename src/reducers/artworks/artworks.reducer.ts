import { Artwork } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import { artworkActionTypes } from './artworks.action.types';
export function artworksReducer(
    state: Array<Array<Artwork>>,
    action: artworksAction
): Array<Array<Artwork>> {
    switch (action.type) {
        case artworkActionTypes.load:
            return action.payload as Array<Array<Artwork>>;
        case artworkActionTypes.add:
            const newArtwork = action.payload as Artwork;
            const columnToAddTo = newArtwork.column;
            return state.map((columnArtworks, i) => {
                // console.log("COLUMNA: ",columnToAddTo)
                // console.log('PAYLOAD ', action.payload);
                if ((i+1) === + columnToAddTo) {
                    // console.log('pepito')
                    return [...columnArtworks, newArtwork];
                } else {
                    // console.log(columnArtworks);
                    return columnArtworks;
                }
            });
        case artworkActionTypes.update:
            const updateArtwork = action.payload as Artwork;
            const columnToUpdate = updateArtwork.column;
            return state.map((columnArtworks, i) => {
                if ((i+1) === +columnToUpdate) {
                    return columnArtworks.map((item) =>
                        item.id === updateArtwork.id ? updateArtwork : item
                    );
                } else {
                    return columnArtworks;
                }
            });
        case artworkActionTypes.delete:
            const finalId = action.payload as Artwork['id'];
            return state.map((columnArtworks) =>
                columnArtworks.filter((item) => item.id !== finalId)
            );
        case artworkActionTypes.reshuffle:
            const shuffledArtworks = action.payload as Array<Array<Artwork>>;
            return [...shuffledArtworks];
        default:
            return [...state];
    }
}
