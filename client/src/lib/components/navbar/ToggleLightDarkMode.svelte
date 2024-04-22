<script lang="ts">
	/**
	 * Component used to toggle light and dark mode
	 *
	 * Using the variables dark and light one can set their own themes as long as they are
	 * found in the tailwind.config.js list of DaisyUI themes.
	 */
	import { onMount } from 'svelte';

	const dark = 'synthwave';
	const light = 'cupcake';

	let currentTheme = light;

	/**
	 * Toggles theme and then updates localStorage and resets the data-theme
	 */
	function toggleTheme() {
		if (currentTheme == light) {
			currentTheme = dark;
		} else {
			currentTheme = light;
		}
		localStorage.setItem('theme', currentTheme);
		updateDaisyUITheme();
	}

	/**
	 * Used to set the attribute in the data-theme portion of the app.html
	 */
	function updateDaisyUITheme() {
		document.documentElement.setAttribute('data-theme', currentTheme);
	}

	/**
	 * Sets the current theme and updates the data-theme in the app.html
	 */
	onMount(() => {
		currentTheme = localStorage.getItem('theme') || light;
		updateDaisyUITheme();
	});
</script>

<div class="flex items-center justify-center p-4">
	<button
		class="relative flex items-center p-1 transition-colors duration-300 ease-in-out bg-gray-700 rounded-full w-14 h-7"
		on:click={toggleTheme}
		aria-label="Toggle theme"
	>
		<div
			class="absolute w-5 h-5 duration-300 ease-in-out transform bg-white rounded-full shadow-md toggle-dot"
			class:translate-x-7={currentTheme === dark}
		></div>
		<div
			class="absolute flex items-center justify-center w-5 h-5 duration-300 ease-in-out transform"
			class:translate-x-7={currentTheme !== dark}
		>
			{#if currentTheme === dark}
				<div class="text-white dark:text-black moon-icon" />
			{:else}
				<div class="sun-icon" />
			{/if}
		</div>
	</button>
</div>

<style>
	.sun-icon:before {
		content: '\2600'; /* Unicode character for sun */
		font-size: 0.8rem;
		display: block;
		text-align: center;
	}
	.moon-icon:before {
		content: '\1F319'; /* Unicode character for crescent moon */
		color: white !important;
		font-size: 0.8rem;
		display: block;
		text-align: center;
	}
</style>
