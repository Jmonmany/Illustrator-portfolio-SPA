import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ARTWORK, ARTWORK2, ARTWORKS } from '../../features/data/artmock';
import { USER } from '../../features/data/usermock';
import { Artwork } from '../../features/models/artwork.model';
import { User } from '../../features/models/user.model';
import { initialContext, ArtworkContext } from './artworks.context';
jest.mock('@firebase/database');
jest.mock('../../config');
const mockArtwork: Artwork = ARTWORK;
const mockUser: User = USER;
const mockDetailedArtwork: Artwork = ARTWORK2;
initialContext.artworks = ARTWORKS;
initialContext.users = [mockUser];
initialContext.artworkDetailed = mockDetailedArtwork;

describe('Given the context AppContext', () => {
    let TestComponent: () => JSX.Element;
    describe('When a Test Component is wrapper with this context', () => {
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
                    users,
                    getAdmin,
                    handleAdmin,
                    handleLoadUsers,
                    handleAddUser,
                    handleUpdateUser,
                    handleDeleteCard,
                    artworks,
                    artworkDetailed,
                    handleDetailed,
                    reShuffleArtworks,
                    handleFile,
                    handleLoad,
                    handleAdd,
                    handleDelete,
                    handleUpdate,
                } = useContext(ArtworkContext);
                getAdmin();
                handleAdmin(mockUser.uid);
                handleLoadUsers();
                handleAddUser(mockUser);
                handleUpdateUser(mockUser);
                handleDeleteCard(mockUser.uid);
                handleDetailed(mockArtwork);
                reShuffleArtworks([mockArtwork]);
                handleFile(event, ARTWORK.id, ARTWORK.column);
                handleLoad();
                handleAdd(mockArtwork);
                handleDelete(mockArtwork);
                handleUpdate(mockArtwork);
                return (
                    <>
                        <ul>
                            <li>{artworks[0][0].title}</li>
                            <li>{users[0].name}</li>
                            <li>{(artworkDetailed as Artwork).title}</li>
                        </ul>
                    </>
                );
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <ArtworkContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ArtworkContext.Provider>
            );
            const elementArt = screen.getByText(
                initialContext.artworks[0][0].title
            );
            const elementUser = screen.getByText(initialContext.users[0].name);
            const elementDetailedArt = screen.getByText(
                (initialContext.artworkDetailed as Artwork).title
            );
            expect(elementArt).toBeInTheDocument();
            expect(elementUser).toBeInTheDocument();
            expect(elementDetailedArt).toBeInTheDocument();
        });
    });
});
