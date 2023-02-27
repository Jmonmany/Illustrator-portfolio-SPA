import { User } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function usersReducer(
    state: Array<User>,
    action: usersAction
): Array<User> {
    switch (action.type) {
        case userActionTypes.load:
            return (action.payload as Array<User>).filter(
                (user: User) => user.description !== ''
            );
        case userActionTypes.add:
            return [...state, action.payload as User];
        case userActionTypes.update:
            const updateArtwork = action.payload as User;
            return state.map((item) =>
                item.uid === updateArtwork.uid ? updateArtwork : item
            );
        case userActionTypes.delete:
            const finalId = action.payload as User['uid'];
            return state.filter((item) => item.uid !== finalId);
        default:
            return [...state];
    }
}
