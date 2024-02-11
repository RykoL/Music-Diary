<script lang="ts">
    import type {PageData} from './$types';
    import EditEntryForm from '$lib/components/EditEntryForm.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import Link from '$lib/components/Link.svelte';
    import Carousel from '$lib/components/Carousel.svelte';
    import NavigationTitle from "$lib/components/NavigationTitle.svelte";

    export let data: PageData;
    let formId: string = 'editEntryForm';
    let formHasChanged = false;

    const onChange = () => {
        formHasChanged = true;
    };
</script>

<Navbar>
    <Link href="/app/diary/{data.diaryId}/entry/{data.entry.id}">Back</Link>
    <div class="prose text-center">
        <NavigationTitle>Edit</NavigationTitle>
    </div>
    {#if formHasChanged}
        <button
                type="submit"
                class="link link-primary link-hover col-start-3 text-right"
                form={formId}
                disabled={!formHasChanged}
        >Save
        </button>
    {:else}
        <button
                type="submit"
                class="link link-neutral link-hover col-start-3 text-right"
                form={formId}
                disabled={!formHasChanged}
        >Save
        </button>
    {/if}
</Navbar>
<main class="flex flex-col py-2 w-96 mx-auto">
    <Carousel imageURLs={data.entry.imageURLs}/>
    <EditEntryForm entry={data.entry} {formId} hasChanged={onChange}/>
</main>
