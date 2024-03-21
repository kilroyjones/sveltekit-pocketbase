<script lang="ts">
	// TODO: Find a better way to do this.
	// Right now if you move away and then reclick it'll open/close quick
	// let toggleMenu = false;

	// function toggle() {
	// 	toggleMenu = !toggleMenu;
	// }
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
		<!-- on:click={toggle} -->
		<!-- on:keydown={toggle} -->

		<div class="w-10 rounded-full">
			<img alt="Account avatar and menu" src="https://i.pravatar.cc/150?img=3" />
		</div>
	</div>
	<!-- {#if toggleMenu} -->
	<ul class="menu menu-md dropdown-content mt-3 z-[1] p-2 bg-base-100 shadow rounded-box w-52">
		<li><a href="/account/profile">Profile</a></li>

		<form action="/account/logout" method="POST">
			<li>
				<button type="submit">Logout</button>
			</li>
		</form>
	</ul>
	<!-- {/if} -->
</div>

<style>
	/* .dropdown:focus-within .dropdown-content {
		display: none;
	} */
</style>
