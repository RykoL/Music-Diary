module.exports = {
    content: ['./src/routes/**/*.{svelte,js,ts}', './src/lib/components/*.svelte'],
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: ["light", "dark"],
    },
};
