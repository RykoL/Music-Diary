import {Entity} from "$lib/server/domain/models/Entity";
import {PostId} from "$lib/server/domain/models/gallery/PostId";
import type {Entry} from "$lib/server/domain/models/diary/Entry";

export class Post extends Entity<PostId> {

    constructor(
        id: PostId,
        public title: string,
        public content: string
    ) {
        super(id);
    }

    public static fromDiaryEntry(entry: Entry): Post {
        return new Post(
            PostId.create(),
            entry.title.value,
            entry.content
        )
    }
}