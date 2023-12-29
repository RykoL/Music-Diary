<script lang="ts">
    interface Entry {
        id: number,
        imageURL: string,
        title: string,
        content: string,
        embedURL: string
        date: string
    }
    export let entry: Entry;
</script>

<style>
    .card-container {
        height: 12.5rem;
    }
</style>

<a href="diary/entry/{entry.id}" class="w-fit mx-auto">
    <article class="card w-96 bg-base-100 shadow-xl card-bordered card-visibility">
        <figure class="card-container"><img loading="lazy" src={entry.imageURL} alt="description of whats happening in here"/></figure>
        <div class="card-body">
            <div class="flex flex-row justify-between">
                <h2 class="card-title">{entry.title}</h2>
                <p class="flex-grow-0 leading-7">{entry.date}</p>
            </div>
            <p>{entry.content}</p>
            {@html entry.embedURL}
        </div>
    </article>
</a>