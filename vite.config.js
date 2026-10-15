import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// GitHub Pages serves project pages from /<repo>/ — set base so assets resolve.
// The workflow sets GITHUB_PAGES_URL (e.g. https://c47x98.github.io/app/).
// paths.base must not end with '/'
const base = process.env.GITHUB_PAGES_URL
	? new URL(process.env.GITHUB_PAGES_URL).pathname.replace(/\/$/, '')
	: '';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				fallback: '404.html'
			}),
			paths: {
				base
			}
		})
	]
});
