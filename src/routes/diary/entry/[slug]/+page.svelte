<script lang="ts">
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<div class="container mx-auto flex flex-col">
    <div>
        <a href="/diary">Zurück</a>
        <a href="/diary/entry/{data.entry.id}/edit">Edit</a>
    </div>
    <div class="prose">
        <h2>{data.entry.title}</h2>
    </div>
    <img src={data.entry.imageURL} alt="">
    <p>{data.entry.content}</p>
    <div>{@html data.entry.embedURL}</div>
    <form action="?/delete" method="POST">
        <button class="btn btn-error">Delete</button>
    </form>
</div>