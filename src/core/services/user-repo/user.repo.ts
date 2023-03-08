// import { Repository } from '../../types/repo';
import { User } from '../../../features/models/user.model';
import { db } from '../../../config';
import { ref, set } from '@firebase/database';

const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';
export class UsersRepo {
    constructor(
        private url = 'https://marina-labella-app-default-rtdb.europe-west1.firebasedatabase.app/users/'
    ) {}
    async load(): Promise<User[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        return Object.values(result);
    }
    async create(payload: User): Promise<User> {
        set(ref(db, 'users/' + payload.uid), payload);
        return payload;
    }
    async update(payload: Partial<User>): Promise<User> {
        if (!payload.uid) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.uid + firebaseCORS, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async delete(uid: User['uid']): Promise<User['uid']> {
        if (!uid) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + uid + firebaseCORS, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return uid;
    }
}
