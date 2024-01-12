export class NewDiary {

    public title: string
    public description?: string

    constructor(formData: FormData) {
        const rawTitle = formData.get('title')
        const rawDescription = formData.get('description')
        if (rawTitle === null) {
            throw new Error('Payload validation failed: Missing title')
        }
        this.title = rawTitle as string
        if (rawDescription) {
            this.description = rawDescription as string
        }
    }
}