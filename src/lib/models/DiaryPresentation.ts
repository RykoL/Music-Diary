import type {EntryPresentation} from "$lib/models/EntryResponse";

export type DiaryPresentation = {
   id: string,
   title: string,
   description: string,
   entries: EntryPresentation[]
}