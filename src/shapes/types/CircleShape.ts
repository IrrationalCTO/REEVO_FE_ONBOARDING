import { Shape } from '../base/Shape'

export class CircleShape extends Shape {

    constructor(color: number, size: number) {
        super(color, size)
        this.render()
    }

    protected draw(): void {
        this.circle(0, 0, this.size).fill(this.color)
    }

    public getArea(): number {
        // formula to calc area (π × r²)
        return Math.PI * this.size * this.size
    }

}