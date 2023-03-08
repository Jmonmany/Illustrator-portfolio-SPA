import { User } from '../../features/models/user.model';
import { userActionTypes } from '../users/users.action.types';

export type usersAction = {
    type: string;
    payload: Array<User> | User | User['uid'];
};

export const usersLoadCreator = (payload: Array<User>): usersAction => ({
    type: userActionTypes.load,
    payload,
});

export const usersAddCreator = (payload: User): usersAction => ({
    type: userActionTypes.add,
    payload,
});

export const usersUpdateCreator = (payload: User): usersAction => ({
    type: userActionTypes.update,
    payload,
});

export const usersDeleteCreator = (
    payload: User['uid']
): usersAction => ({
    type: userActionTypes.delete,
    payload,
});
