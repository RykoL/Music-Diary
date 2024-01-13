import {SvelteKitAuth} from "@auth/sveltekit";
import GoogleProvider from '@auth/core/providers/google'
import CredentialsProvider from "@auth/core/providers/credentials";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NODE_ENV} from '$env/static/private'
import {User} from "$lib/server/domain/models/User";


const getProviders = () => {
    if (NODE_ENV === 'development' || NODE_ENV === 'test') {
        return [CredentialsProvider({
                name: "Email",
                credentials: {
                    username: {label: "Username", type: "text"},
                    password: {label: "Password", type: "password"}
                },
                async authorize(credentials, req) {
                    return new User()
                }
            },
        )]
    }

    return [
        GoogleProvider({clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET})
    ]
}


export const handle = SvelteKitAuth({
    providers: getProviders()
})
