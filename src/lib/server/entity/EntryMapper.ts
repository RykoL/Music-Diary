import {Entry} from "$lib/server/domain/models/Entry";
import {AttachedImage, ImageId} from "$lib/server/domain/models/Image";
import {SpotifyId, SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";

export type EntryRecord = {
    entryId: number,
    entryTitle: string,
    content: string,
    date: string
    songId: string
    url: string
    embed: string
    diaryId: string
    imageId: string | null
}

export const mapEntries = (rows: EntryRecord[]): Entry[] => {
    const entryMap = new Map<number, EntryRecord[]>()
    rows.forEach((row) => {
        entryMap.set(row.entryId, [...entryMap.get(row.entryId) ?? [], row])
    })
    return Array.from(entryMap.values()).map(mapSingleEntry)
}
export const mapSingleEntry = (rows: EntryRecord[]): Entry => {
    const row = rows[0]
    const images = rows
        .filter(r => r.imageId !== null)
        .map(r => new AttachedImage(
            new ImageId(r.imageId!),
            new URL(`http://localhost:5173/${r.imageId}`))
        )

    return Entry.builder()
        .withId(row['entryId'])
        .withDiaryId(row['diaryId'])
        .title(row['entryTitle'])
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
