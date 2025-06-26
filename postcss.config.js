// /Users/meldejesus/Desktop/Amplify/postcss.config.js
module.exports = {
    plugins: {
      // If you are using Tailwind CSS, it should usually come before Mantine's preset
      // to allow Tailwind to process its utilities first.
      'tailwindcss': {},
      'postcss-preset-mantine': {},
      'postcss-simple-vars': {
        variables: {
          // Correct variable names for Mantine v7 with postcss-simple-vars
          'mantine-breakpoint-xs': '36em',
          'mantine-breakpoint-sm': '48em',
          'mantine-breakpoint-md': '62em',
          'mantine-breakpoint-lg': '75em',
          'mantine-breakpoint-xl': '88em',
        },
      },
      // autoprefixer is often included by Next.js by default.
      // If you need explicit control or run into prefixing issues, you can add it here:
      // 'autoprefixer': {}, // (and run: npm install -D autoprefixer)
    },
  };
  