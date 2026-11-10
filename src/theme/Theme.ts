import type { FillInput, StrokeInput} from 'pixi.js'

export interface Theme {
    name: 'light' | 'dark'
    pageBackground: number
    areaFill: FillInput
    areaBorder: StrokeInput
    shapePallete: number[]
}