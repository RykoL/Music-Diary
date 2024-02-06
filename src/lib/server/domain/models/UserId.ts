import { ValueObject } from '$lib/server/domain/models/ValueObject';
import { randomUUID } from 'node:crypto';

export class UserId extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	public static create(): UserId {
		return new UserId(randomUUID());
	}
}
