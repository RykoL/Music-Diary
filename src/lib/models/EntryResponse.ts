
export type EntryPresentation = {
    id: number
    title: string
    content: string
    imageURL: string
    songURL: string
    embedURL: string
    date: string
}

export type EntryListResponse = Array<EntryPresentation>
