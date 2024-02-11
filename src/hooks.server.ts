import { type Session, SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import CredentialsProvider from '@auth/core/providers/credentials';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NODE_ENV } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { User } from '$lib/server/domain/models/User';

const getProviders = () => {
	if (NODE_ENV === 'development' || NODE_ENV === 'test') {
		return [
			CredentialsProvider({
				name: 'Email',
				credentials: {
					username: { label: 'Username', type: 'text' },
					password: { label: 'Password', type: 'password' }
				},
				async authorize(_credentials, _req) {
					return {
						id: '4b40c3b2-c08f-4e88-8e06-549e8aed5f5b',
						name: 'Peter Panski'
					};
				}
			})
		];
	}

	return [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	];
};

export const authHook = SvelteKitAuth({
	providers: getProviders(),
	callbacks: {
		async session(params): Promise<Session> {
			return {
				...params.session,
				user: {
					...params.session.user,
					id: params.token.sub
				}
			};
		}
	}
});

export const retrieveUserHook: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	if (session) {
		event.locals.appUser = User.fromSession(session);
	}
	return resolve(event);
};

export const handle: Handle = sequence(authHook, retrieveUserHook);
