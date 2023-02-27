import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ARTWORK, ARTWORK2 } from '../../features/data/artmock';
import { USER, USER2 } from '../../features/data/usermock';
import { Artwork } from '../../features/models/artwork.model';
import { User } from '../../features/models/user.model';
import { initialContext, ArtworkContext } from './artworks.context';
jest.mock('@firebase/database');
jest.mock('../../config');
const mockArtwork: Artwork = ARTWORK;
const mockUser: User = USER;
const mockDetailedArtwork: Artwork = ARTWORK2;
const mockCurrentUser: User = USER2;
initialContext.artworks = [mockArtwork];
initialContext.users = [mockUser];
initialContext.artworkDetailed = mockDetailedArtwork;
initialContext.currentUser = mockCurrentUser;

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
                    currentUser,
                    getAdmin,
                    handleAdmin,
                    handleCurrentUser,
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
                handleCurrentUser(mockUser);
                handleLoadUsers();
                handleAddUser(mockUser);
                handleUpdateUser(mockUser);
                handleDeleteCard(mockUser.uid);
                handleDetailed(mockArtwork);
                reShuffleArtworks([mockArtwork]);
                handleFile(event, ARTWORK.id);
                handleLoad();
                handleAdd(mockArtwork);
                handleDelete(mockArtwork.id);
                handleUpdate(mockArtwork);
                return (
                    <>
                        <ul>
                            <li>{artworks[0].title}</li>
                            <li>{users[0].name}</li>
                            <li>{(currentUser as User).name}</li>
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
                initialContext.artworks[0].title
            );
            const elementUser = screen.getByText(initialContext.users[0].name);
            const elementDetailedArt = screen.getByText(
                (initialContext.artworkDetailed as Artwork).title
            );
            const elementCurrentUser = screen.getByText(
                (initialContext.currentUser as User).name
            );
            expect(elementArt).toBeInTheDocument();
            expect(elementUser).toBeInTheDocument();
            expect(elementDetailedArt).toBeInTheDocument();
            expect(elementCurrentUser).toBeInTheDocument();
        });
    });
});
