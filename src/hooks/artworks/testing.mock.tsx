import { ARTWORK, ARTWORK2, ARTWORK3, ARTWORKS } from '../../features/data/artmock';
import { ArtworksRepo } from '../../core/services/art-repo/art.repo';
export const mockArtwork1 = ARTWORK;
mockArtwork1.id = '000001';
mockArtwork1.description = 'test description';
export const mockArtwork2 = ARTWORK2;
mockArtwork2.id = '000002';
export const mockArtworks = ARTWORKS;
export const mockAddArtwork = ARTWORK3;
mockAddArtwork.id = '000003';
export const mockUpdateArtwork = { ...mockArtwork2, name: 'Update Artwork' };

export const mockValidRepoResponse = () => {
    (ArtworksRepo.prototype.load as jest.Mock).mockResolvedValue(mockArtworks);
    (ArtworksRepo.prototype.create as jest.Mock).mockResolvedValue(
        mockAddArtwork
    );
    (ArtworksRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdateArtwork
    );
    (ArtworksRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockArtwork1.id
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (ArtworksRepo.prototype.load as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.create as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.update as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
};
