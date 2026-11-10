import type { Shape } from '../base/Shape'
import { CircleShape } from '../types/CircleShape'
import { EllipseShape } from '../types/EllipseShape'
import { StarShape } from '../types/StarShape'
import { PolygonShape } from '../types/PolygonShape'
import { IrregularShape } from '../types/IrregularShape'
import { config } from '../../config'

export type ShapeType =
    | 'triangle' | 'square' | 'pentagon' | 'hexagon'
    | 'circle' | 'ellipse' | 'star' | 'irregular'

export class ShapeFactory {

    private static readonly FALLING_TYPES: ShapeType[] = [
        'triangle', 'square', 'pentagon', 'hexagon', 'circle', 'ellipse', 'star'
    ]

    public static create(type: ShapeType, color: number, size: number): Shape {
        switch (type) {
            case 'triangle': return new PolygonShape(color, size, 3)
            case 'square': return new PolygonShape(color, size, 4)
            case 'pentagon': return new PolygonShape(color, size, 5)
            case 'hexagon': return new PolygonShape(color, size, 6)
            case 'circle': return new CircleShape(color, size)
            case 'ellipse': return new EllipseShape(color, size)
            case 'star': return new StarShape(color, size)
            case 'irregular': return new IrregularShape(color, size)
        }
    }

    public static createRandom(palette: number[]): Shape {
        const type = this.pick(ShapeFactory.FALLING_TYPES)
        return this.create(type, this.pick(palette), this.randomSize())
    }

    public static createIrregular(palette: number[]): Shape {
        return this.create('irregular', this.pick(palette), this.randomSize())
    }

    private static pick<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)]
    }

    private static randomSize(): number {
        const { MIN_SHAPE_SIZE, MAX_SHAPE_SIZE } = config
        return MIN_SHAPE_SIZE + Math.random() * (MAX_SHAPE_SIZE - MIN_SHAPE_SIZE)
    }
}