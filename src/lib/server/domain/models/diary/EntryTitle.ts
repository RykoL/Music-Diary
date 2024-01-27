export class EntryTitle {
	constructor(public value: string) {
		if (value.length > 50) {
			throw new Error('Title cannot be longer than 50 characters.');
		}
	}
}
