declare module "frostcolor" {
  export class Color extends ColorImmutable {
    /**
     * @param cyan - a number between *0* and *100*
     * @param magenta - a number between *0* and *100*
     * @param blue - a number between *0* and *100*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    static fromCMY(cyan: number, magenta: number, yellow: number, alpha?: number): Color;
    /**
     * @param cyan - a number between *0* and *100*
     * @param magenta - a number between *0* and *100*
     * @param blue - a number between *0* and *100*
     * @param key - a number between *0* and *100*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    static fromCMYK(
      cyan: number,
      magenta: number,
      yellow: number,
      key: number,
      alpha?: number
    ): Color;
    /**
     * @param hue - a number between *0* and *360*
     * @param saturation - a number between *0* and *100*
     * @param lightness - a number between *0* and *100*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    static fromHSL(hue: number, saturation: number, lightness: number, alpha?: number): Color;
    /**
     * @param hue - a number between *0* and *360*
     * @param saturation - a number between *0* and *100*
     * @param value - a number between *0* and *100*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    static fromHSV(hue: number, saturation: number, value: number, alpha?: number): Color;
    /**
     * Create a new *Color* from a HTML color string
     * @param color_string - a string containing a color value in either hexadecimal, RGB, RGBA, HSL, HSLA or a standard HTML color name
     */
    static fromString(color_string: string): Color;

    /**
     * Calculate the contrast between two colors
     * @returns a number between *1* and *21*
     */
    static contrast(color1: Color, color2: Color): number;
    /**
     * Calculate the distance between two colors
     */
    static distance(color1: Color, color2: Color): number;

    /**
     * Find an optimally contrasting color for another color
     * @param color2 - default: null
     * @param min_contrast - a number between *1* and *21* indicating the minimum valid contrast; default: *4.5*
     * @param step_size - a number between *0* and *1* indicating the amount to darken/lighten the color on each iteration; default: *0.01*
     */
    static findContrast(
      color1: Color,
      color2?: Color,
      min_contrast?: number,
      step_size?: number
    ): Color;
    /**
     * Create a new *Color* by mixing two colors together by a specified amount
     * @param amount - a number between *0* and *1*
     */
    static mix(color1: Color, color2: Color, amount: number): Color;
    /**
     * Create a new *Color* by multiplying two colors together by a specified amount
     * @param amount - a number between *0* and *1*
     */
    static multiply(color1: Color, color2: Color, amount: number): Color;

    /**
     * @param brightness - a number between *0* and *100*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    constructor(brightness: number, alpha: number);
    /**
     * @param red - a number between *0* and *255*
     * @param green - a number between *0* and *255*
     * @param blue - a number between *0* and *255*
     * @param alpha - a number between *0* and *1*; default: *1*
     */
    constructor(red: number, green: number, blue: number, alpha?: number);

    /**
     * Create a new *Color* from an existing *Color*
     */
    clone(): Color;

    /**
     * @returns the alpha value of the color (between *0* and *1*)
     */
    getAlpha(): number;
    /**
     * @returns the brightness value of the color (between *0* and *100*)
     */
    getBrightness(): number;
    /**
     * @returns the hue value of the color (between *0* and *360*)
     */
    getHue(): number;
    /**
     * @returns the saturation value of the color (between *0* and *100*)
     */
    getSaturation(): number;

    /**
     * @returns a string containing either a HTML color name (if one exists), a hexadecimal string (if alpha is *1*) or an RGBA string
     */
    toString(): string;
    /**
     * @returns an HSL/HSLA string representation of the color
     */
    toHSLString(): string;
    /**
     * @returns a hexadecimal string representation of the color
     */
    toHexString(): string;
    /**
     * @returns an RGB/RGBA string representation of the color
     */
    toRGBString(): string;

    /**
     * @returns the closest color name for the color
     */
    label(): string;
    /**
     * @returns the relative luminance value of the color (between *0* and *1*)
     */
    luma(): number;

    /**
     * Set the alpha value of the color
     * @param alpha - a number between *0* and *1*
     */
    setAlpha(alpha: number): Color;
    /**
     * Set the brightness value of the color
     * @param brightness - a number between *0* and *100*
     */
    setBrightness(brightness: number): Color;
    /**
     * Set the hue value of the color
     * @param hue - a number between *0* and *360*
     */
    setHue(hue: number): Color;
    /**
     * Set the saturation value of the color
     * @param saturation - a number between *0* and *100*
     */
    setSaturation(saturation: number): Color;

    /**
     * Darken the color by a specified amount
     * @param amount - a number between *0* and *1*
     */
    darken(amount: number): Color;
    /**
     * Invert the color
     */
    invert(): Color;
    /**
     * Lighten the color by a specified amount
     * @param amount - a number between *0* and *1*
     */
    lighten(amount: number): Color;
    /**
     * Shade the color by a specified amount
     * @param amount - a number between *0* and *1*
     */
    shade(amount: number): Color;
    /**
     * Tint the color by a specified amount
     * @param amount - a number between *0* and *1*
     */
    tint(amount: number): Color;
    /**
     * Tone the color by a specified amount
     * @param amount - a number between *0* and *1*
     */
    tone(amount: number): Color;

    /**
     * Create an array with 2 analogous color variations
     * @returns [secondary, accent]
     */
    analogous(): [Color, Color];
    /**
     * Create a complementary color variation
     */
    complementary(): Color;
    /**
     * Create an array with 2 split color variations
     * @returns [secondary, accent]
     */
    split(): [Color, Color];
    /**
     * Create an array with 2 triadic color variations
     * @returns [secondary, accent]
     */
    triadic(): [Color, Color];
    /**
     * Create an array with 3 tetradic color variations
     * @returns [secondary, alternate, accent]
     */
    tetradic(): [Color, Color, Color];

    /**
     * Create an array with a specified number of shade variations
     * @param shades - a number indicating how many shades you wish to generate; default: *10*
     */
    shades(shades?: number): Color[];
    /**
     * Create an array with a specified number of tint variations
     * @param tints - a number indicating how many tints you wish to generate; default: *10*
     */
    tints(tints?: number): Color[];
    /**
     * Create an array with a specified number of tone variations
     * @param tones - a number indicating how many tones you wish to generate; default: *10*
     */
    tones(tones?: number): Color[];
    /**
     * Create an array with a specified number of shade, tint, & tone variations
     * @param shades - a number indicating how many shades you wish to generate; default: *10*
     * @param tints - a number indicating how many tints you wish to generate; default: *10*
     * @param tones - a number indicating how many tones you wish to generate; default: *10*
     */
    palette(shades?: number, tints?: number, tones?: number);
  }
}
