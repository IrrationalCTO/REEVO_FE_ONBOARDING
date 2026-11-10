import { Shape } from "../base/Shape";

export class EllipseShape extends Shape {

    private static readonly HEIGHT_MULTIPLIER = 0.7

    protected draw(): void {
        this.ellipse(0, 0, this.size, this.size * EllipseShape.HEIGHT_MULTIPLIER)
        .fill(this.color)
    }
    public getArea(): number {
        return Math.PI * this.size * (this.size * EllipseShape.HEIGHT_MULTIPLIER)
    }    
}