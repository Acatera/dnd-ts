import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    // Enables treating warnings as errors, causing compilation to fail on warnings or errors
    dev: false,
  },
};
