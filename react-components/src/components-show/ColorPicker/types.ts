import { MouseEventHandler } from "react"

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
  onSelect(color: string): void
}

export interface FreeSelectorProps {
  className?: string
  parsedColor: Color; // we'll need to convert this to HSV
  satCoords: number[] // [x, y] coordinates for saturation map
  hueCoords: number // x coordinates for hue map
  onSaturationChange: MouseEventHandler
  onHueChange: MouseEventHandler
}

export interface ColorPickerProps {
  color: string
  onChange(color: string): void
}
