import { Repository } from '../../types/repo';
import { Artwork } from '../../../features/models/artwork.model';
const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';
export class ArtworksRepo implements Repository<Artwork> {
    constructor(
        private url = 'https://marina-labella-app-default-rtdb.europe-west1.firebasedatabase.app/admin/artworks/'
    ) {}
    async load(): Promise<Artwork[][]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        const columns = Object.values(result);
        const artworksByColumns = columns.map((column: any) =>
            Object.keys(column)
                .map((key) => ({ ...column[key], id: key }))
                .filter((item: Artwork) => item.url !== undefined)
        );

        return artworksByColumns;
    }
    async create(payload: Partial<Artwork>): Promise<Artwork> {
        const resp = await fetch(
            this.url + 'column' + payload.column + firebaseCORS,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        const objResp = await fetch(
            this.url +
                'column' +
                payload.column +
                '/' +
                result.name +
                firebaseCORS
        );
        return await objResp.json();
    }
    async update(payload: Partial<Artwork>): Promise<Artwork> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(
            this.url +
                'column' +
                payload.column +
                '/' +
                payload.id +
                firebaseCORS,
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async delete(item: Artwork): Promise<Artwork['id']> {
        if (!item.id) return Promise.reject(invalidIdError);
        const resp = await fetch(
            this.url + 'column' + item.column + '/' + item.id + firebaseCORS,
            {
                method: 'DELETE',
            }
        );
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return item.id;
    }
}
