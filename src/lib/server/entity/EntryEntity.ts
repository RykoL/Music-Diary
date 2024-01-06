import {Entry} from "$lib/server/domain/models/Entry";
import {Image, ImageId} from "$lib/server/domain/models/Image";
import {SpotifyId, SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";

export type EntryRow = {
    entryId: number,
    title: string,
    content: string,
    date: string
    songId: string
    url: string
    embed: string
    imageId: string | null
}

export const EntryMapper = (rows: EntryRow[]): Entry => {
    const row = rows[0]
    const images = rows
        .filter(r => r.imageId !== null)
        .map(r => new Image(
            new ImageId(r.imageId!),
            new URL(`http://localhost:5173/${r.imageId}`))
        )

    return Entry.builder()
        .withId(row['entryId'])
        .title(row['title'])
        .withImages(...images)
        .content(row['content'])
        .song(new SpotifySong(
            new SpotifyId(row['songId']),
            new SpotifyURL(row['url']),
            row['embed']
        ))
        .date(new Date(row['date']))
        .build();
}