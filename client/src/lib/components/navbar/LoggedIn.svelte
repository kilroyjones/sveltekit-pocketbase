<script lang="ts">
	export let avatar: string | undefined;
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
		<div class="w-12 overflow-hidden rounded-full">
			{#if avatar}
				<img
					class="object-cover w-full h-full border-4 rounded-full border-primary"
					alt="Account avatar and menu"
					src={avatar}
				/>
			{:else}
				<div class="flex items-center justify-center w-full h-full rounded-full bg-primary"></div>
			{/if}
		</div>
	</div>
	<ul class="menu menu-md dropdown-content mt-3 z-[1] p-2 bg-base-100 shadow rounded-box w-52">
		<li><a href="/account/profile">Profile</a></li>

		<form action="/account/logout" method="POST">
			<li>
				<button type="submit">Logout</button>
			</li>
		</form>
	</ul>
</div>
