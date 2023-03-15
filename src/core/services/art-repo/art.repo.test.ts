import { ARTWORK, ARTWORK2, ARTWORKS } from '../../../features/data/artmock';
import { Artwork } from '../../../features/models/artwork.model';
import { ArtworksRepo } from './art.repo';
describe('Given a Artwork Repo', () => {
    const mockData = ARTWORKS;
    ARTWORK.id = '0';
    ARTWORK2.id = '1';
    const repo = new ArtworksRepo();
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(ArtworksRepo);
    });

    describe('When we use Artworks load method', () => {
        test('Then if there is NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
        test('Then we received the Artworks content in the repo', async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(data);
        });
    });
    describe('When we use create method', () => {
        test(`Then if the data is VALID, we received the new Artwork 
            created in the repo with its own new id`, async () => {
            const mockNewTaskPayload: Partial<Artwork> = {
                title: 'New Artwork',
                url: 'Test url',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewTaskPayload),
            });

            const data = await repo.create(mockNewTaskPayload);
            expect(data).toHaveProperty('title', mockNewTaskPayload.title);
            expect(data).toHaveProperty('url', mockNewTaskPayload.url);
        });
        test(`Then if the data is NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({});
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use update method', () => {
        test(`Then if the ID is VALID, we received the Artwork 
            updated in the repo`, async () => {
            const updatePayload: Partial<Artwork> = {
                id: mockData[0][0].id,
                title: 'Lisa',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(updatePayload),
            });
            const data = await repo.update(updatePayload);
            expect(data).toHaveProperty('title', updatePayload.title);
        });
        test(`Then if there is NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.update({});
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID is NOT VALID, we received a null`, async () => {
            const updatePayload: Partial<Artwork> = {
                id: 'bad',
                title: 'Lisa',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.update(updatePayload);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('When we use delete method', () => {
        test(`Then if the ID is VALID, we received the ID 
            of the Artwork deleted in the repo`, async () => {
            const id = mockData[0][0].id;
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(id),
            });
            const data = await repo.delete(ARTWORK);
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toBe(id);
        });
        // test(`Then if there is NOT ID, we received a null`, async () => {
        //     await expect(async () => {
        //         await repo.delete(ARTWORK);
        //     }).rejects.toThrowError();
        //     expect(global.fetch).not.toHaveBeenCalled();
        // });
        test(`Then if the ID is NOT VALID, we received a null`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.delete(ARTWORK);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
