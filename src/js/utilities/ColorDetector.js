import { colorToRgbaArray, isLightColor, rgbaToCssString } from '@theodorejb/color-detect';

export default class ColorDetector {

  is_light_color(color_code) {
    const rgba = colorToRgbaArray(color_code);
    return isLightColor(rgba);
  }
}
