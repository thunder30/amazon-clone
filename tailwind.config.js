module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                amazon: {
                    light: '232F3E',
                    DEFAULT: '#131921',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
}
