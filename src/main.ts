type RGB = [r: number, g: number, b: number];
type RGBIndex = 0 | 1 | 2;
type ColorConfig = { percentage: number; startColor: RGB; endColor: RGB };

export type Hex = string | `#${string}`;

export type ShadesConfig = {
   format?: 'hex' | 'rgb';
   halfShades?: boolean;
   separator?: boolean;
};

export type Shades = {
   [key: number]: string;
};

const isBrowser = typeof window !== 'undefined';
const root = isBrowser ? document : null;

function hexToRgb(_hex: Hex): RGB {
   const hex = _hex.replace('#', '');

   const color = hex.length === 3 ? hex + hex : hex;

   const r = color.substring(0, 2);
   const g = color.substring(2, 4);
   const b = color.substring(4, 6);

   return [r, g, b].map((_channel) => {
      const channel = parseInt(_channel, 16);
      if (isNaN(channel) || channel < 0 || channel > 255) {
         throw new Error(`Invalid Hex color provided: ${_hex}`);
      }
      return channel;
   }) as RGB;
}

function getColor(
   { format, separator }: ShadesConfig,
   { percentage, startColor, endColor }: ColorConfig,
) {
   const rgb = endColor.map((channel, _index) => {
      const index = _index as RGBIndex;
      return Math.round(channel + percentage * (startColor[index] - channel));
   });
   if (format === 'rgb') return rgb.join(separator ? ',' : ' ');

   return '#' + rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('');
}

export const shadesOf = (hex: Hex, config?: ShadesConfig) => {
   const baseColor = hexToRgb(hex);
   const black: RGB = [0, 0, 0];
   const white: RGB = [255, 255, 255];

   let shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

   const { format, halfShades, separator }: ShadesConfig = {
      format: 'hex',
      halfShades: false,
      separator: false,
      ...config,
   };

   if (halfShades) shades = [...shades, 150, 250, 350, 450, 550, 650, 750, 850].sort();

   const result: Shades = {};

   for (let shade of shades) {
      const originalShade = shade;

      if (shade === 500 && format === 'hex') {
         result[shade] = hex;
         continue;
      }

      let isDarkShade = shade > 500;
      if (isDarkShade) shade -= 500;

      const percentage = shade / 500;
      const startColor = isDarkShade ? black : baseColor;
      const endColor = isDarkShade ? baseColor : white;
      result[originalShade] = getColor({ format, separator }, { percentage, startColor, endColor });
   }

   return result;
};

export const applyShades = (shades: Shades, name: string, config?: { prefix: string }): void => {
   if (!root) return;
   const target = root.documentElement;
   const prefix = config?.prefix || 'color';
   for (let [shade, color] of Object.entries(shades)) {
      target.style.setProperty(`--${prefix}-${name}-${shade}`, color);
   }
};
