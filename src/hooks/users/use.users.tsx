import { useCallback, useMemo, useReducer, useState } from 'react';
import { UsersRepo } from '../../core/services/user-repo/user.repo';
import { User } from '../../features/models/user.model';
import { usersReducer } from '../../reducers/users/users.reducer';
import { consoleDebug } from '../../tools/debug';
import * as ac from '../../reducers/users/users.action.creator';
import { UserCredential } from 'firebase/auth';

export type useUsersType = {
    getAdmin: () => boolean;
    getStatus: () => Status;
    getUsers: () => Array<User>;
    handleAdmin: (uid: string) => void;
    handleUser: (userCredentials: UserCredential) => void;
    handleLoadUsers: () => Promise<void>;
    handleAddUser: (user: User) => Promise<void>;
    handleUpdateUser: (userPayload: Partial<User>) => Promise<void>;
    handleDeleteCard: (uid: User['uid']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useUsers(): useUsersType {
    const repo = useMemo(() => new UsersRepo(), []);
    const initialState: Array<User> = [];
    const initialStatus = 'Starting' as Status;
    const [users, dispatchUsers] = useReducer(usersReducer, initialState);
    const [admin, setAdmin] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const getUsers = () => users;
    const getStatus = () => status;
    const getAdmin = () => admin;
    const handleUser = async function (userCredentials: UserCredential) {
        const user = userCredentials.user;
        handleAdmin(user.uid);
    };

    const handleAdmin = (uid: string) => {
        uid === process.env.REACT_APP_FIREBASE_MARINA_UID
            ? setAdmin(true)
            : setAdmin(false);
    };
    const handleLoadUsers = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            dispatchUsers(ac.usersLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAddUser = async function (user: User) {
        try {
            await repo.create(user);
            dispatchUsers(ac.usersAddCreator(user));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdateUser = async function (userPayload: Partial<User>) {
        try {
            const fullUsers = await repo.update(userPayload);
            dispatchUsers(ac.usersUpdateCreator(fullUsers));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDeleteCard = async function (uid: User['uid']) {
        try {
            const finalId = await repo.delete(uid);
            dispatchUsers(ac.usersDeleteCreator(finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        getAdmin,
        getStatus,
        getUsers,
        handleAdmin,
        handleUser,
        handleLoadUsers,
        handleAddUser,
        handleUpdateUser,
        handleDeleteCard,
    };
}
