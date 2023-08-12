import { defineConfig } from "vite";
import { resolve } from "node:path";

// allows one to say
// mangle: false in the below config for easy debugging
const mangle_opts = {
  toplevel: false,
  keep_classnames: false,
  keep_fnames: false,
  ie8: false,
  safari10: false,
  properties: {
    regex: "^_",
    debug: false,
  },
};

const terser_prod_opts = {
  compress: {
    arguments: true,
    arrows: true,
    booleans: true,
    booleans_as_integers: true,
    collapse_vars: true,
    comparisons: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    directives: true,
    drop_console: false,
    drop_debugger: true,
    ecma: 2022,
    evaluate: true,
    expression: false,
    hoist_funs: true,
    hoist_props: true,
    hoist_vars: false,
    if_return: true,
    inline: 3,
    join_vars: true,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: false,
    lhs_constants: false,
    loops: true,
    module: true,
    negate_iife: true,
    passes: 10,
    properties: true,
    pure_funcs: [
      "uncurryThis",
      "querySelector",
      "querySelectorAll",
      "getElementById",
      "max",
      "floor",
      "random",
    ],
    // livin' dangerous: this makes
    // terser assume getters _never_
    // produce side effects
    pure_getters: true,
    reduce_funcs: false,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    switches: true,
    typeofs: true,
    toplevel: true,
    unsafe: true,
    unsafe_arrows: false,
    unsafe_comps: false,
    unsafe_Function: false,
    unsafe_math: false,
    unsafe_symbols: false,
    unsafe_methods: false,
    unsafe_proto: false,
    unsafe_regexp: false,
    unsafe_undefined: false,
    unused: true,
  },
  mangle: mangle_opts,
};

const terser_dev_opts = {
  compress: false,
  mangle: false,
};

export default defineConfig({
  build: {
    modulePreload: {
      // we only use the most artisanal, modulepreload
      // enabled browsers
      polyfill: false,
    },
    // public class fields are ES2022, if this isn't set
    // ESBuild will polyfill it during TS compilation
    target: "es2022",
    minify: "terser",
    terserOptions: terser_prod_opts,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        editor: resolve(__dirname, "editor.html"),
      },
    },
  },
});
