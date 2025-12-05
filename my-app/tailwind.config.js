/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003893",
        primaryDark: "#001D4D",
        primaryLight: "#1A71FF",
        secondary: "#EE0718",
        secondaryDark: "#A40F2D",
        secondaryLight: "#EC2D53",
      },
      container: {
        padding: {
          DEFAULT: '.625rem',
          '2xl': '5rem',
        },
      },
      backgroundImage: {
        'btnGradient': 'linear-gradient(180deg, #9AC23B 0%, #C6AD2E 100%)',
        'btnGradientHover': 'linear-gradient(180deg, #C6AD2E 0%, #9AC23B 100%)',
        'aboutBg': "url('/img/about-bg.svg')",
        'aboutGradient': 'linear-gradient(93deg, #2A272721.1%, rgba(55, 49, 49, 0.69)40.89%, rgba(101, 90, 90, 0.00)83.98%)'
      },
      boxShadow: {
        'sphare': '-20px 2px 49px -4px rgba(22, 117, 36, 0.27)',
        'cardShadow': '1px 4px 4px 0px rgba(0, 0, 0, 0.04)',
        'faqShadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        nunito: ["'Nunito Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",

      minsm: { min: '640px' },
      minmd: { min: '991px' },
      minlg: { min: '1024px' },
      minxl: { min: '1280px' },
      min2xl: { min: '1536px' },
    },
  },
  important: true,
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
