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

## Roadmap (Not prioritized)

- Allow for turning diary public
- Implement error handling and resiliency measures
- Implement a deployment strategy
- Customizable db adapters (at least support postgres)
- Login via external oidc providers
- Allow adding other music links like Youtube / Apple Music / Deezer

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
