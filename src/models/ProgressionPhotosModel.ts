/* eslint-disable prettier/prettier */
import { AppDataSource } from '../dataSource';
import { ProgressionPhotos } from '../entities/ProgressionPhotos';

const photoRepository = AppDataSource.getRepository(ProgressionPhotos);

async function addPhoto(userId: string, photo: string): Promise<ProgressionPhotos | undefined> {
    if (!photoRepository.findOne({ where: { userId } })) {
        let newProgressionPhoto = new ProgressionPhotos();
        const uploadDate = new Date();
        newProgressionPhoto.begingingPhoto = { photo, uploadDate };
        newProgressionPhoto = await photoRepository.save(newProgressionPhoto);
        return newProgressionPhoto;
    }
}

export { addPhoto };
