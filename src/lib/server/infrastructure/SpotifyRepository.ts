import type {SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";
import type {Database} from "sqlite";

type OEmbedResponse = {
    html: string
}

export const getSpotifyEmbed = async (spotifyUrl: SpotifyURL): Promise<string> => {
    const searchURLParams = new URLSearchParams({url: spotifyUrl.value})
    const resp = await fetch(`https://open.spotify.com/oembed?${searchURLParams}`)
    if (resp.ok) {
        const body = await resp.json() as OEmbedResponse
        return body.html
    }
    console.error(`Couldn't get embedding for ${spotifyUrl.value} with status ${resp.status}`)

    throw new Error(await resp.text())
}

export const updateSongEmbedding = async (db: Database, song: SpotifySong) => {
    const embed = await getSpotifyEmbed(song.spotifyURL)
    await db.run('UPDATE song set embed = ? WHERE id = ?', embed, song.id.value)
}