/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    SyntheticEvent,
    useCallback,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { ArtworksRepo } from '../../core/services/art-repo/art.repo';
import { artworksReducer } from '../../reducers/artworks/artworks.reducer';
import * as ac from '../../reducers/artworks/artworks.action.creator';
import { consoleDebug } from '../../tools/debug';
import { Artwork } from '../../features/models/artwork.model';
import { storage } from '../../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { detailedArtworkReducer } from '../../reducers/artworks/detailed.reducer';

export type useArtworksType = {
    artworkDetailed: Artwork | object;
    handleDetailed: (artwork: Artwork) => void;
    reShuffleArtworks: (list: Array<Artwork>) => void;
    handleFile: (ev: any, id: string, column: string) => void;
    getStatus: () => Status;
    getArtworks: () => Array<Array<Artwork>>;
    handleLoad: () => Promise<void>;
    handleAdd: (artworks: Artwork) => Promise<void>;
    handleUpdate: (artworksPayload: Partial<Artwork>) => Promise<void>;
    handleDelete: (Artwork: Artwork) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useArtworks(): useArtworksType {
    const repo = useMemo(() => new ArtworksRepo(), []);
    const initialDetailed: Artwork | object = {};
    const initialState: Array<Array<Artwork>> = [[], [], []];
    const initialStatus = 'Starting' as Status;
    const [artworks, artworksDispatcher] = useReducer(
        artworksReducer,
        initialState
    );
    const [artworkDetailed, detailDispatcher] = useReducer(
        detailedArtworkReducer,
        initialDetailed
    );
    const [status, setStatus] = useState(initialStatus);
    const getArtworks = () => artworks;
    const getStatus = () => status;
    const handleFile = async (ev: SyntheticEvent, id: string, column: string) => {
        console.log('MIERDA')
        ev.preventDefault();
        const element = ev.target as HTMLInputElement;
        if (!element.files) {
            consoleDebug('Any file selected');
            return;
        }
        const input = element.files[0];
        const artworkRef = ref(storage, input.name);
        await uploadBytes(artworkRef, input);
        const url = await getDownloadURL(artworkRef);
        const artworkData = new Artwork(input.name, url, column);
        artworkData.id = id;
        handleUpdate(artworkData);
    };

    const reShuffleArtworks = (list: Array<Artwork>) => {
        artworksDispatcher(ac.artworksReShuffleCreator(list));
    };

    const handleDetailed = (artwork: Artwork) => {
        detailDispatcher(ac.artworksDetailedCreator(artwork));
    };

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            artworksDispatcher(ac.artworksLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (artwork: Artwork) {
        try {
            const fullArtworks = await repo.create(artwork);
            artworksDispatcher(ac.artworksAddCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (artworksPayload: Partial<Artwork>) {
        try {
            const fullArtworks = await repo.update(artworksPayload);
            artworksDispatcher(ac.artworksUpdateCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (item: Artwork) {
        try {
            const finalId = await repo.delete(item);
            artworksDispatcher(ac.artworksDeleteCreator(finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        artworkDetailed,
        handleDetailed,
        reShuffleArtworks,
        handleFile,
        getStatus,
        getArtworks,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
