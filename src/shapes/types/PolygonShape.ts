import { Shape } from "../base/Shape"

export class PolygonShape extends Shape {

    private readonly sides: number;

    constructor(color: number, size: number, sides: number){
        super(color, size)
        this.sides = sides
        this.render()
    }

    protected draw(): void {
        this.regularPoly(0, 0, this.size, this.sides)
        .fill(this.color)
    }

    public getArea(): number {
        // (n / 2) × r² × sin (2π / n)
        const n = this.sides
        const r = this.size
        return (n / 2) * r * r * Math.sin((2 * Math.PI) / n)
    }
    
}