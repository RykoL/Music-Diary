# Music diary

Music diary is a platform to keep track of the music that has a special place in your heart and the memories you associate along with it.

## Features

- Adding diary entries with text
- Adding a playable spotify link to each diary entry
- Playing a preview of the song while reading the entry
- Deleting diary entries
- Editing title, date, text and the song associated with it
- Add one or multiple images to an entry
- Creating multiple diaries
- Deleting diaries
- Login via external oidc providers

## Roadmap (Not prioritized)

- Allow for turning diary public / private
- Implement error handling and resiliency measures
- Implement a deployment strategy
- Customizable db adapters (at least support postgres)
- Allow adding other music links like Youtube / Apple Music / Deezer
- Generate a preview link for people to watch without having an account
- Have a way to lock diaries e.g. by setting a password on the diary and then unlocking it for a period of time by retyping that password.
- Delete an account / remove all data
- Detaching / deleting images from entries

## Running locally

Install dependencies

```bash
npm i
```

To run locally run following command

```bash
npm run dev
```

## Running tests

To run unit tests:

```bash
npm run test
```

To run journey tests:

```bash
npm run e2e
```

To run journey tests in interactive mode:

```bash
npm run e2e-ui
```
