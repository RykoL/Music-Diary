import {SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";

type OEmbedResponse = {
    html: string
}

export const getSpotifyEmbed = async (spotifyUrl: SpotifyURL): Promise<SpotifySong> => {
    const searchURLParams = new URLSearchParams({url: spotifyUrl.value})
    const resp = await fetch(`https://open.spotify.com/oembed?${searchURLParams}`)
    if (resp.ok) {
        const body = await resp.json() as OEmbedResponse
        return new SpotifySong(
            spotifyUrl.getId(),
            spotifyUrl,
            body.html
        )
    }
    console.error(`Couldn't get embedding for ${spotifyUrl.value} with status ${resp.status}`)

    throw new Error(await resp.text())
}