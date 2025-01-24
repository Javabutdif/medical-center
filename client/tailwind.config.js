// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Include the paths where Tailwind CSS should look for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0908', // Dark color
        secondary: '#7b0d1e',//dark red color
        accent: '#fffffa', // Light color
        muted: '#A9927D', // Muted color
        dark: '#5E503F', // Dark brown color
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
