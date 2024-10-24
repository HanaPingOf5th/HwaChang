import type { Config } from 'tailwindcss';
import headlessui from '@headlessui/tailwindcss';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.4s ease-out',
        'accordion-up': 'accordion-up 0.4s ease-out',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'hwachang-dark-green': "1FAB89",
        'hwachang-green': "62D2A2",
        'hwachang-light-green': "9DF3C4",
        'hwachang-bright-green': "D7FBE8",
        'hwachang-hana-green': "008485",
        'hwachang-hana-red': "E90061",
        'hwachang-hana-gold': "AD9A5F",
        'hwachang-hana-silver': "B5B5B5",
        'hwachang-gray1': "8E8E8E",
        'hwachang-red': "F24F4F",
        'hwachang-color': "62D2A2",
        'hwachang-mute': "E91313",
        'hwachang-gray2': "D6D6D6",
        'hwachang-gray3': "BEBEBE",
        'hwachang-green1': "275247",
      },
      fontSize: {
        'custom-inherit': ['inherit', { lineHeight: 'inherit' }],
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [headlessui, forms, animate, scrollbar({ nocompatible: true, preferredStrategy: 'pseudoelements' })],
};
export default config;
