import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { configDefaults } from 'vitest/config'; 

export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './setupTests.js',
	},
	resolve: {
		...(process.env.VITEST ? {
		  conditions: ['default', 'module', 'import', 'browser']
		} : null)
	},
	server: {
		allowedHosts: ["63ce-45-4-59-143.ngrok-free.app"]
	}
}));
