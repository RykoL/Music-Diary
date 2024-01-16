import {Diary} from "$lib/server/domain/models/Diary";
import {DiaryId} from "$lib/server/domain/models/DiaryId";
import {UserId} from "$lib/server/domain/models/UserId";
import type {Session} from "@auth/sveltekit";

export class User {
    constructor(public id: UserId) {
    }

    public static anonymous() {
        return new User(new UserId("anonymous"))
    }

    startNewDiary(title: string, description: string | undefined) {
        return new Diary(
            new DiaryId(),
            title,
            description ?? "",
            [],
            this.id
        )
    }

    static fromSession(session: Session): User {
        if (session.user === undefined || session.user.id === undefined) {
            throw new Error('Cannot retrieve user id from session')
        }

        return new User(
            new UserId(session.user.id)
        )
    }
}