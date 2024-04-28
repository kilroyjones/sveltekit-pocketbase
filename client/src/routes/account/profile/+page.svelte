<script lang="ts">
	// Types and variables
	import ProfileImage from '$lib/components/shared/ProfileImage.svelte';
	import { user } from '$lib/stores/user.store';

	let imageBase64 = '';

	/**
	 * Uploads the avatar
	 *
	 * @param image
	 */
	const updateAvatar = async (image: string) => {
		const formData = new FormData();
		formData.append('avatar', image);

		const result = await fetch('?/updateAvatar', {
			method: 'POST',
			body: formData
		});

		if (result.ok && $user) {
			$user.avatar = image;
		} else {
			console.error('Failed to update avatar');
		}
	};

	/**
	 * It will create an imgElement and then apply the existing image to the
	 * canvas, resizing it so that it's 64px max width
	 *
	 * @param file
	 */
	const processImage = (file: FileList) => {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const imgElement = document.createElement('img');
			imgElement.src = e.target.result.toString();
			imgElement.onload = () => {
				const canvas = document.createElement('canvas');
				const maxSize = 128;

				let width = imgElement.width;
				let height = imgElement.height;

				height = (height / width) * maxSize;
				width = maxSize;

				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');

				if (ctx) {
					ctx.drawImage(imgElement, 0, 0, width, height);
				}

				imageBase64 = canvas.toDataURL('image/png');
				if (imageBase64) {
					updateAvatar(imageBase64);
				}
			};
		};
		reader.readAsDataURL(file[0]);
	};

	/**
	 * This opens a file dialog and allows you to upload an image.
	 *
	 */
	function triggerFileInput() {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.onchange = () => {
			if (fileInput.files && fileInput.files.length > 0) {
				processImage(fileInput.files);
			}
		};
		fileInput.click();
	}
</script>

<div class="flex flex-col items-center min-h-screen mt-20 lg:mt-20 md:mt-20">
	<div class="w-full max-w-md px-8 py-6 rounded-xl bg-base-100">
		<div class="flex items-center p-4">
			{#if $user}
				<button on:click={triggerFileInput} class="relative">
					{#if $user.avatar}
						<ProfileImage avatar={$user.avatar}></ProfileImage>
					{:else if $user.avatarUrl}
						<ProfileImage avatar={$user.avatarUrl}></ProfileImage>
					{:else}
						<ProfileImage avatar={undefined}></ProfileImage>
					{/if}
					<span
						class="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 text-md text-white transform translate-x-1 translate-y-1.5 border-white rounded-full bg-primary"
						>+</span
					>
				</button>
				<h1 class="pl-5 text-2xl font-bold">{$user.username}</h1>
			{/if}
		</div>
		<div class="border-t border-gray-200"></div>
		<div class="p-4 text-center">Profile information</div>
	</div>
</div>
