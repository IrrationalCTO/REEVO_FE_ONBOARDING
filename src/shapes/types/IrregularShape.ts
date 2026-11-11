import { Shape } from "../base/Shape";

export class IrregularShape extends Shape {

    //['x1', 'y1', 'x2', 'y2', 'x3', 'y3']
    private points: number[]

    constructor(color: number, size: number) {
        super(color, size)
        this.points = this.generatePoints()
        this.render()
    }

    private static readonly MIN_POINTS = 5
    private static readonly MAX_POINTS = 8
    private static readonly MIN_RADIUS_RATIO = 0.5

    private generatePoints(): number[] {
    const { MIN_POINTS, MAX_POINTS, MIN_RADIUS_RATIO } = IrregularShape
    const count = MIN_POINTS + Math.floor(Math.random() * (MAX_POINTS - MIN_POINTS + 1))
    const points: number[] = []

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const radius = this.size * (MIN_RADIUS_RATIO + Math.random() * (1 - MIN_RADIUS_RATIO))
        points.push(Math.cos(angle) * radius, Math.sin(angle) * radius)
    }
    return points
}

  protected draw(): void {
    this.poly(this.points).fill(this.color)
}

    // shoelace formula
public getArea(): number {
    const p = this.points
    let sum = 0
    for (let i = 0; i < p.length; i += 2) {
        const j = (i + 2) % p.length // next point, wraps to the first
        sum += p[i] * p[j + 1] - p[j] * p[i + 1]
    }
    return Math.abs(sum) / 2
}

public override reset(color: number, size: number): void {
    this.size = size                    // generatePoints uses size
    this.points = this.generatePoints()
    super.reset(color, size)
}
}