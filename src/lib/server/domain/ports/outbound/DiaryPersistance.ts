import type {Diary} from "../../models/Diary";
import type {DiaryId} from "../../models/DiaryId";

export interface DiaryPersistence {
    getDiaryById(diaryId: DiaryId): Promise<Diary | undefined>

    getDiaries(): Promise<Array<Diary>>

    saveDiary(diary: Diary): Promise<void>

    removeDiary(diaryId: DiaryId): Promise<void>
}