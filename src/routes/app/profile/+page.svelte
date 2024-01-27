<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { Menu } from 'lucide-svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<Navbar>
	<div class="prose col-start-2">
		<h3>Your profile</h3>
	</div>
	<div class="flex justify-end">
		<details class="dropdown dropdown-end">
			<summary class="m-1 btn">
				<Menu />
			</summary>
			<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44">
				<li><span>Settings</span></li>
				<li>
					<button
						on:click={() => {
							signOut();
						}}>Logout</button
					>
				</li>
			</ul>
		</details>
	</div>
</Navbar>
<main class="container mt-10">
	<div class="avatar w-full">
		{#if $page.data.session.user?.image}
			<div class="w-48 rounded-full mx-auto border-primary border-2">
				<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Me" />
			</div>
		{:else}
			<div class="w-48 rounded-full mx-auto border-primary border-2 bg-base-200" />
		{/if}
	</div>
	<div class="prose text-center mt-5">
		<h2>{$page.data.session.user.name ?? 'User'}</h2>
		<p>{$page.data.session.user.email ?? 'peter.panski@pansko.de'}</p>
	</div>
</main>
