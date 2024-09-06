import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				dev: !production // enable run-time checks when not in production
			}
		}),
		css({ output: 'bundle.css' }), // extract component CSS into a separate file

		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),

		typescript({
			sourceMap: !production,
			inlineSources: !production,
			noEmitOnError: true // Stop build on TypeScript errors
		}),

		!production && serve(), // In dev mode, call `npm run start` once the bundle has been generated

		!production && livereload('public'), // Watch the `public` directory and refresh the browser on changes when not in production

		production && terser() // Minify for production builds
	],
	onwarn: () => {
		// Ignore all warnings
	},
	watch: {
		clearScreen: false
	}
};
