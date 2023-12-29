<script lang="ts">
    import type {PageData} from './$types'
    import EditEntryForm from "$lib/components/EditEntryForm.svelte";

    export let data: PageData;
</script>

<EditEntryForm entry={data.entry} />