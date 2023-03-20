/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    mockUser1,
    mockUser2,
    mockAddUser,
    mockUpdateUser,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import { UsersRepo } from '../../core/services/user-repo/user.repo';
import * as users from './use.users';
import { User } from '../../features/models/user.model';
import * as debug from '../../tools/debug';
import { login } from '../../config';
jest.mock('@firebase/database');
jest.mock('../../config');
jest.mock('../../core/services/art-repo/art.repo.ts');

UsersRepo.prototype.load = jest.fn();
UsersRepo.prototype.create = jest.fn();
UsersRepo.prototype.update = jest.fn();
UsersRepo.prototype.delete = jest.fn();
describe(`Given useUsers (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        spyConsole = jest.spyOn(debug, 'consoleDebug');
        (login as jest.Mock).mockResolvedValue({
            name: 'sample',
            email: 'sample@gmail.com',
            getIdToken: '12345',
            user: {
                displayName: '',
                email: '',
                getIdToken: jest.fn(),
                uid: process.env.REACT_APP_FIREBASE_MARINA_UID,
            },
        });
        const userCredentialsMock = login('sample', 'sample@gmail.com');
        TestComponent = () => {
            const {
                getAdmin,
                getStatus,
                handleUser,
                getUsers,
                handleLoadUsers,
                handleAddUser,
                handleUpdateUser,
                handleDeleteCard,
            } = users.useUsers();
            return (
                <>
                    <button onClick={handleLoadUsers}>Load</button>
                    <button onClick={() => handleAddUser(mockAddUser)}>
                        Add
                    </button>
                    <button onClick={() => handleUpdateUser(mockUpdateUser)}>
                        Update
                    </button>
                    <button onClick={() => handleDeleteCard(mockUser2.uid)}>
                        DeleteCard
                    </button>
                    <button
                        onClick={async () =>
                            handleUser(await userCredentialsMock)
                        }
                    >
                        handleUser
                    </button>
                    <h1>{getAdmin() ? 'true' : 'false'}</h1>
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getUsers().map((User: User) => (
                                    <li key={User.uid}>{User.name}</li>
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
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);

        test('Then its function handleLoadUsers should be add places to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(UsersRepo.prototype.load).toHaveBeenCalled();
            expect(await screen.findByText(mockUser1.name)).toBeInTheDocument();
            expect(await screen.findByText(mockUser2.name)).toBeInTheDocument();
        });

        test('Then its function handleAddUser should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(UsersRepo.prototype.create).toHaveBeenCalled();
        });

        test('Then its function handleUpdateUser should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(UsersRepo.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdateUser.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(UsersRepo.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(await screen.findByText(mockUser2.name)).toBeInTheDocument();
        });
        test('Then its function handleUser ADMIN should be used', async () => {
            userEvent.click(buttons[4]);
            const admin = await screen.findByRole('heading', {
                name: 'true',
            });
            expect(admin).toBeInTheDocument();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoadUsers should be used', async () => {
            userEvent.click(buttons[0]);
            expect(UsersRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAddUser should be used', async () => {
            userEvent.click(buttons[1]);
            expect(UsersRepo.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdateUser should be used', async () => {
            userEvent.click(buttons[2]);
            expect(UsersRepo.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDeleteCard should be used', async () => {
            userEvent.click(buttons[3]);
            expect(UsersRepo.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
describe(`Given useUsers (custom hook)
            render with a virtual component for false admin`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (login as jest.Mock).mockResolvedValue({
            name: 'sample',
            email: 'sample@gmail.com',
            getIdToken: '12345',
            user: {
                displayName: '',
                email: '',
                getIdToken: jest.fn(),
                uid: '',
            },
        });
        const userCredentialsMock = login('sample', 'sample@gmail.com');
        TestComponent = () => {
            const { getAdmin, handleUser, getUsers } = users.useUsers();
            return (
                <>
                    <button
                        onClick={async () =>
                            handleUser(await userCredentialsMock)
                        }
                    >
                        handleUser
                    </button>
                    <h1>{getAdmin() ? 'true' : 'false'}</h1>

                    <div>
                        <ul>
                            {getUsers().map((User: User) => (
                                <li key={User.uid}>{User.name}</li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        };
        await act(async () => {
            render(<TestComponent />);
        });
        buttons = screen.getAllByRole('button');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);
        test('Then its function handleUser ADMIN should be used', async () => {
            userEvent.click(buttons[0]);
            const admin = await screen.findByRole('heading', {
                name: 'false',
            });
            expect(admin).toBeInTheDocument();
        });
    });
});
