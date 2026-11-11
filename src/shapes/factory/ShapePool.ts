import type { Shape } from '../base/Shape'
import { ShapeFactory, type ShapeType } from './ShapeFactory'

export class ShapePool {
    
    private readonly free = new Map<ShapeType, Shape[]>() // unused shapes per type
    private readonly typeOf = new Map<Shape, ShapeType>() // remembers each shape's type

    public acquire(type: ShapeType, color: number, size: number): Shape {
        const reused = this.free.get(type)?.pop()
        if (reused) {
            reused.reset(color, size)
            return reused
        }
        const shape = ShapeFactory.create(type, color, size)
        this.typeOf.set(shape, type)
        return shape
    }

    public release(shape: Shape): void {
        const type = this.typeOf.get(shape)
        if (!type) return
        shape.removeFromParent()
        if (!this.free.has(type)) this.free.set(type, [])
        this.free.get(type)!.push(shape)
    }
}