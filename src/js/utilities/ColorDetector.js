import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
extend([namesPlugin]);


export default class ColorDetector {

  is_light_color(color_code) {
    const color_code_parsed = colord(color_code);
    return color_code_parsed.isLight();
  }

  is_valid_color_code(color_code) {
    const color_code_parsed = colord(color_code);
    return color_code_parsed.isValid();
  }

  parse_color_code(color_code) {
    debugger;
    if (!this.is_valid_color_code(color_code)) {
      return {
        is_valid: false,
        color_code_raw: color_code,
      }
    }

    return {
      is_valid: true,
      color_code_raw: color_code,
      color_code_string_hsl: colord(color_code).toHslString(),
    };
  }

}
