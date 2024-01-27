<script lang="ts">
	import { enhance } from '$app/forms';
	import type { EntryPresentation } from '$lib/models/EntryResponse';

	export let entry: EntryPresentation;
	export let formId: string;

	export let hasChanged: () => void;
</script>

<form method="post" action="?/edit" id={formId}>
	<div class="form-control">
		<label for="title" class="label">
			<span class="label-text">Title</span>
		</label>
		<input
			type="text"
			id="title"
			name="title"
			class="input input-bordered w-full"
			placeholder="Title"
			required
			value={entry.title}
			on:change={hasChanged}
		/>
	</div>
	<div class="form-control">
		<label for="song" class="label">
			<span class="label-text">Song</span>
		</label>
		<input
			type="url"
			id="song"
			name="song"
			class="input input-bordered w-full"
			placeholder="https://open.spotify.com/track/6Gi4xccZRKja1w78ZoBs5c?si=b284ff0046c3440"
			value={entry.songURL}
			required
			on:change={hasChanged}
		/>
	</div>
	<div class="form-control">
		<label for="content" class="label">
			<span class="label-text">Content</span>
		</label>
		<textarea
			id="content"
			name="content"
			class="textarea textarea-bordered h-24"
			placeholder="Any text you wanna share additionally"
			on:change={hasChanged}>{entry.content}</textarea
		>
	</div>
	<div class="form-control">
		<label for="date" class="label">
			<span class="label-text">Date</span>
		</label>
		<input
			type="date"
			class="w-full input input-bordered"
			id="date"
			name="date"
			value={entry.date}
			required
			on:change={hasChanged}
		/>
	</div>
</form>
<form action="?/attach-image" method="post" enctype="multipart/form-data" use:enhance>
	<div class="form-control w-full">
		<label class="label" for="image">
			<span class="label-text">Image</span>
		</label>
		<input
			type="file"
			class="file-input file-input-bordered w-full"
			id="image"
			name="image"
			accept="image/*"
			required
		/>
	</div>
	<button class="btn btn-primary">Attach new Image</button>
</form>
