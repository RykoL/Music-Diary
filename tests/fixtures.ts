import type {DiaryRecord} from "$lib/server/entity/DiaryMapper";
import {Entry} from "$lib/server/domain/models/Entry";
import {AttachedImage, ImageId} from "$lib/server/domain/models/Image";
import {SpotifyId, SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";

export const baseRecord: DiaryRecord = {
    diaryId: "58f7daa7-6b1e-4400-b94a-5f44f1d810f7",
    diaryTitle: "My music diary",
    diaryDescription: "This is your first diary.",
    content: "This is the content of the entry",
    date: "2023-12-01",
    embed: "<iframe></iframe>",
    entryId: 0,
    imageId: "ca3321fe-5e3a-48d4-9356-d98579a258d9",
    songId: "0kNrFAHWyp1ffdT6SslgAf",
    entryTitle: "Vaction in Andalusia",
    url: "https://open.spotify.com/track/0kNrFAHWyp1ffdT6SslgAf?si=8ba194b8033f4306"
}

export const aFirstEntry = Entry
    .builder()
    .withId(baseRecord.entryId)
    .content(baseRecord.content)
    .title(baseRecord.entryTitle)
    .withImages(new AttachedImage(
        new ImageId(baseRecord.imageId!),
        new URL(`http://localhost:5173/${baseRecord.imageId}`)
    ))
    .date(new Date(baseRecord.date))
    .song(new SpotifySong(
        new SpotifyId(baseRecord.songId),
        new SpotifyURL(baseRecord.url),
        baseRecord.embed
    ))
    .build()

export const aSecondEntry = Entry
    .builder()
    .withId(baseRecord.entryId + 1)
    .content(baseRecord.content)
    .title("Second")
    .withImages(new AttachedImage(
        new ImageId(baseRecord.imageId!),
        new URL(`http://localhost:5173/${baseRecord.imageId}`)
    ))
    .date(new Date(baseRecord.date))
    .song(new SpotifySong(
        new SpotifyId(baseRecord.songId),
        new SpotifyURL(baseRecord.url),
        baseRecord.embed
    ))
    .build()