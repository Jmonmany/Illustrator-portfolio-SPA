import { Artwork } from "../../features/models/artwork.model";

export interface Repository<T> {
    load: () => Promise<T[][]>;
    create: (payload: Partial<T>) => Promise<T>;
    update: (payload: Partial<T>) => Promise<T>;
    delete?: (item: Artwork) => Promise<Artwork['id']>;
}
