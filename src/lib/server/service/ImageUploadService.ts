import { writeFile} from 'node:fs/promises'
import {ImageId, UnattachedImage} from "$lib/server/domain/models/Image";

export const uploadImage = async (imageFile: File): Promise<UnattachedImage> => {
    const imageId = new ImageId();
    await writeFile(`static/${imageId.value}`, Buffer.from(await imageFile.arrayBuffer()));


    return new UnattachedImage(
        imageId
    )
}