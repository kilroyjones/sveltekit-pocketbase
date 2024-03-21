<script lang="ts">
	import { UserStore } from '$lib/stores/user.store';
</script>

<div class="flex justify-center">
	<div class="w-full max-w-2xl">
		<div class="flex items-center p-4">
			<div class="w-12 h-12">
				<img
					src="https://i.pravatar.cc/150?img=3"
					alt="Profile iamge"
					class="object-cover w-full h-full rounded-full"
				/>
			</div>
			<h1 class="pl-5 text-2xl font-bold">{UserStore.getUsername()}</h1>
		</div>
		<div class="border-t border-gray-200"></div>
		<div class="p-4 text-center">Placeholder</div>
	</div>
</div>
