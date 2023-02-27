import { Repository } from '../../types/repo';
import { Artwork } from '../../../features/models/artwork.model';
const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';
export class ArtworksRepo implements Repository<Artwork> {
    constructor(
        private url = 'https://marina-labella-app-default-rtdb.europe-west1.firebasedatabase.app/admin/artworks/'
    ) {}
    async load(): Promise<Artwork[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        const realResult = Object.keys(result).map((key) => ({
            ...result[key],
            id: key,
        }));
        return realResult.filter((item: Artwork) => item.url !== undefined);
    }
    async create(payload: Partial<Artwork>): Promise<Artwork> {
        const resp = await fetch(this.url + firebaseCORS, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async update(payload: Partial<Artwork>): Promise<Artwork> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.id + firebaseCORS, {
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
    async delete(id: Artwork['id']): Promise<Artwork['id']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id + firebaseCORS, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
