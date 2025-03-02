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
        heading: ['Poppins', 'sans-serif'], // Use Poppins for headings
        body: ['Roboto', 'sans-serif'], // Use Roboto for body text
      },
      minHeight: {
        'screen/2xl': 'calc(100vh - 450px)',
        'screen/lg': 'calc(100vh - 550px)',
        'screen/main': 'calc(100vh - 100px)',
      },
    },
  },
  plugins: [],
};
