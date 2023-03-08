import { useMemo } from 'react';
import { ArtworkContext } from './artworks.context';
import { useArtworks } from '../../hooks/artworks/use.artworks';
import { useUsers } from '../../hooks/users/use.users';

export function ArtworkContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const {
        artworkDetailed,
        handleDetailed,
        getArtworks,
        reShuffleArtworks,
        handleLoad,
        handleAdd,
        handleDelete,
        handleUpdate,
        handleFile,
    } = useArtworks();
    const {
        handleAdmin,
        getAdmin,
        getUsers,
        handleUser,
        handleLoadUsers,
        handleAddUser,
        handleUpdateUser,
        handleDeleteCard,
    } = useUsers();
    const context = useMemo(
        () => ({
            users: getUsers(),
            getAdmin,
            handleAdmin,
            handleUser,
            handleLoadUsers,
            handleAddUser,
            handleUpdateUser,
            handleDeleteCard,
            artworks: getArtworks(),
            artworkDetailed,
            handleDetailed,
            reShuffleArtworks,
            handleFile,
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [
            handleAdmin,
            getUsers,
            getAdmin,
            handleUser,
            handleLoadUsers,
            handleAddUser,
            handleUpdateUser,
            handleDeleteCard,
            getArtworks,
            artworkDetailed,
            handleDetailed,
            reShuffleArtworks,
            handleAdd,
            handleDelete,
            handleLoad,
            handleUpdate,
            handleFile,
        ]
    );

    return (
        <ArtworkContext.Provider value={context}>
            {children}
        </ArtworkContext.Provider>
    );
}
