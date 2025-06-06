export interface Color {
  hex: string
  rgb: ColorRGB
  hsv: ColorHSV
}

export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface ColorHSV {
  h: number
  s: number
  v: number
}

export interface PredefinedSelectorProps {
  className?: string
  parsedColor: Color
  colors: string[]
}

export interface PredefinedSelectorEmits {
  (e: 'select', color: string): void
}

export interface FreeSelectorProps {
  className?: string
  parsedColor: Color; // we'll need to convert this to HSV
  satCoords: number[] // [x, y] coordinates for saturation map
  hueCoords: number // x coordinates for hue map
}
export interface FreeSelectorEmits {
  (e: 'hueChange', event: MouseEvent): void
  (e: 'saturationChange', event: MouseEvent): void
}

export interface ColorPickerProps {
  color: string
}

export interface ColorPickerEmits {
  (e: 'update:color', color: string): void
}
