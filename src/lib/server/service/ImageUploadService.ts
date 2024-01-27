import { writeFile } from 'node:fs/promises';
import type { UnattachedImage } from '$lib/server/domain/models/Image';

export const uploadImage = async (image: UnattachedImage): Promise<void> => {
	await writeFile(`static/${image.id.value}`, Buffer.from(await image.file.arrayBuffer()));
};

export const uploadImages = async (...images: UnattachedImage[]) => {
	await Promise.all(
		images.map((img) => {
			return uploadImage(img);
		})
	);
};
