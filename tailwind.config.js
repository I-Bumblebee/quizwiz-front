/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      laptop: '432px',
    },
    extend: {
      maxHeight: {
        '2xl': '42rem',
        xl: '36rem',
        'screen-2xl': '100rem',
      },
      minHeight: {
        'screen-2xl': '100rem',
      },
      minWidth: {
        26: '6.5rem',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl-plus': '20px',
        lg: '10px',
        'md-plus': '8px',
        'md-minus': '4px',
      },
      scale: {
        115: '1.15',
      },
      dropShadow: {
        success: '0px 0px 50px #01E17B',
        warning: '0px 0px 50px #FFD21F',
        error: '0px 0px 50px #F04349',
      },
      boxShadow: {
        card: '0 4px 6px -2px #10182808,  0 12px 16px -4px #10182814',
        '4xl': '0 2px 5px #00000033, 0 6px 15px #0000001F, 0 10px 20px #00000024',
        timer: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)'
      },
      transitionProperty: {
        width: 'width',
      },
      width: {
        100: '25rem',
        86: '21.625rem',
        82: '20.5rem',
      },
      height: {
        76: '19rem',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        laptop: '6rem',
      },
      screens: {
        laptop: '1440px',
      },
    },
    colors: {
      gray: {
        25: '#FCFCFD',
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#101828',
      },
      orange: '#FF5613',
      red: '#F04438',
      blue: '#4B69FD',
      black: '#000000',
      white: '#FFFFFF',
      azure: '#EAFAFE',
      sand: '#FEF6E7',
      pink: '#FCE7F1',
      shark: '#242C32',
      green: '#01E17B',
      gold: '#FFD21F',
      crimson: '#F04349',
      periwinkle: '#BCC7FF',
      cerise: '#E72A8B',
      'green-haze': '#027A48',
      mediumseagreen: '#039855',
      emerald: '#12B76A',
      inherit: 'inherit',
    },
    fontSize: {
      '2xl': ['4.5rem', '3.5rem'],
      'xl-plus': ['3.75rem', '3.75rem'],
      xl: ['3rem', '3.5rem'],
      'xl-minus': ['2.5rem', '2.9rem'],
      lg: ['1.875rem', '2.375rem'],
      'md-plus': ['1.5rem', '2rem'],
      md: ['1.125rem', '1.25rem'],
      sm: ['1rem', '1.5rem'],
      base: ['0.875rem', '1.5rem'],
      xs: ['0.75rem', '1.25rem'],
    },
  },
  plugins: [],
}
