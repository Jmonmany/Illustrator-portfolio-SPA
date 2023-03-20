/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { useArtworksType } from '../../hooks/artworks/use.artworks';
import { Artwork } from '../../features/models/artwork.model';
import { Artworks } from '../types/artwork';
import { User } from '../../features/models/user.model';
import { useUsersType } from '../../hooks/users/use.users';
import { UserCredential } from 'firebase/auth';

export type ArtworkContextStructure = Omit<
    useArtworksType,
    'getStatus' | 'getArtworks'
> & {
    artworks: Array<Array<Artwork>>;
};

export type UserContextStructure = Omit<
    useUsersType,
    'getStatus' | 'getUsers' 
> & {
    users: Array<User>
};

export const initialContext: ArtworkContextStructure & UserContextStructure = {
    users: [],
    handleAdmin: (uid: string) => {},
    handleAddUser: async (user: User) => {},
    handleLoadUsers: async () => {},
    handleUpdateUser: async (userPayload: Partial<User>) => {},
    getAdmin: () => false,
    handleUser: async (userCredentials: UserCredential) => {},
    handleDeleteCard: async (uid: string) => {},
    artworkDetailed: {},
    artworks: [],
    handleDetailed: (artwork: Artwork) => {},
    reShuffleArtworks: () => {},
    handleFile: async () => {},
    handleLoad: async () => {},
    handleAdd: async (artworks: Artworks) => {},
    handleDelete: async (item: Artworks) => {},
    handleUpdate: async (artworksPayload: Partial<Artwork>) => {},
};

export const ArtworkContext = createContext(initialContext);
