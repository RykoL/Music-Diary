import { ValueObject } from '$lib/server/domain/models/ValueObject';

export class UserId extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}
}
