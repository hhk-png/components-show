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
  parsedColor: Color
  colors: string[]
  onSelect(color: string): void
}

export interface FreeSelectorProps {
  parsedColor: Color; // we'll need to convert this to HSV
  satCoords: number[] // [x, y] coordinates for saturation map
  hueCoords: number // x coordinates for hue map
  onSaturationChange: MouseEventHandler
  onHueChange: MouseEventHandler
}

export interface FreePickerProps {
  color: string
  onChange(color: string): void
}

export type PredefinedPickerProps = FreePickerProps & {
  colors?: string[]
}
