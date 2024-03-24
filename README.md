# tw-shades

This package provides a simple function to generate shades of a given color, which can be used to extend the color palette in your Tailwind CSS configuration. It allows you to create a consistent and customizable color scheme for your project.

This project is a Fork of [tailwind-shades](https://github.com/jxxe/tailwind-shades)

## Features

-  🌈 Color shade generator [50 to 950]
-  ✨ Include Half Shades [150, 250, 350, etc]
-  ⚡ Zero dependencies
-  ✅ Hex and RGB Output
-  ✅ CSS Variables Setup
-  ✅ Typescript Support

## Installation

Use npm to install tw-shades.

```bash
npm install tw-shades
```

## Usage

```javascript
// tailwind.config.js
import { shadesOf } from 'tw-shades';

/* @type {import('tailwindcss').Config} */
module.exports = {
   content: [],
   theme: {
      extend: {
         colors: {
            accent: shadesOf('#913985'),
            /* accent: {
               '50': '#f4ebf3',
               '100': '#e9d7e7',
               '200': '#d3b0ce',
               '300': '#bd88b6',
               '400': '#a7619d',
               '500': '#913985',
               '600': '#742e6a',
               '700': '#572250',
               '800': '#3a1735',
               '900': '#1d0b1b',
               '950': '#0f060d'
          }
       */
         },
      },
   },
   plugins: [],
};
```

## RGB Mode

You can pass a format property

```javascript
import { shadesOf } from 'tw-shades';

const shades = shadesOf('#913985', { format: 'rgb' });
console.log(shades);
/* {
  '50': '244 235 243',
  '100': '233 215 231',
  '200': '211 176 206',
  '300': '189 136 182',
  '400': '167 97 157',
  '500': '145 57 133',
  '600': '116 46 106',
  '700': '87 34 80',
  '800': '58 23 53',
  '900': '29 11 27',
  '950': '15 6 13'
} */
```

## CSS Variables

You can create or update CSS Variables with the applyShades function

```javascript
import { shadesOf, applyShades } from 'tw-shades';

const shades = shadesOf('#913985', { format: 'rgb' }); // or hex

applyShades(shades, 'primary');

/*
:root {
    --color-primary-50: '244 235 243'
    --color-primary-100: '233 215 231'
    --color-primary-200: '211 176 206'
    ...
}
*/
```

Also in you tailwind.config.js

```javascript
// tailwind.config.js
import { shadesOf } from 'tw-shades';

/* @type {import('tailwindcss').Config} */
module.exports = {
   content: [],
   theme: {
      extend: {
         colors: {
            primary: {
               50: 'rgb(var(--color-primary-50) / <alpha-value>)',
               100: 'rgb(var(--color-primary-100) / <alpha-value>)',
               200: 'rgb(var(--color-primary-200) / <alpha-value>)',
               300: 'rgb(var(--color-primary-300) / <alpha-value>)',
               400: 'rgb(var(--color-primary-400) / <alpha-value>)',
               500: 'rgb(var(--color-primary-500) / <alpha-value>)',
               600: 'rgb(var(--color-primary-600) / <alpha-value>)',
               700: 'rgb(var(--color-primary-700) / <alpha-value>)',
               800: 'rgb(var(--color-primary-800) / <alpha-value>)',
               900: 'rgb(var(--color-primary-900) / <alpha-value>)',
               950: 'rgb(var(--color-primary-950) / <alpha-value>)',
            },
         },
      },
   },
   plugins: [],
};
```

💡 Tailwind classes are generated in build time. Using CSS variables you can set colors dynamically in run time, just override the CSS custom properties.

Take into account to use the shades format and tailwind config accordely. You don't want a rgb() function for hex colors, right?

See [Tailwind Documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables)

## Config

Both shadesOf and applyShades are customizables by config object

### shadesOf

```typescript
const shadesOf: (hex: Hex, config?: ShadesConfig) => Shades;

type ShadesConfig = {
   format?: 'hex' | 'rgb'; // default to hex
   halfShades?: boolean; // generate halfshades, default to false
   separator?: boolean; // if true, rgb colors will format as '102,6,0'
};
```

### applyShades

```typescript
const applyShades: (shades: Shades, name: string, config?: { prefix: string }) => void;

type Shades = { [key: number]: string };

/*
    name: The variable name. Required.
    config: {
        prefix: You can change this. Default to 'color'
    }

    --${prefix}-${name}-${shade}: value
    --color-primary-100: '233 215 231'
*/
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (In conventional commit format, you can use 'cz')
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See LICENSE.txt for more information.
