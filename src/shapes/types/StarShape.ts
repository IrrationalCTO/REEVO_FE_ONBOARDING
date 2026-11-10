import { Shape } from "../base/Shape"

export class StarShape extends Shape {

    private static readonly STAR_EDGES = 5
    private static readonly INNER_RATIO = 0.5

    constructor(color: number, size: number) {
        super(color, size)
        this.render()
    }

    protected draw(): void {
        this.star(0, 0, StarShape.STAR_EDGES, this.size, this.innerRadius)
        .fill(this.color)
    }

    public getArea(): number {
        const n = StarShape.STAR_EDGES
        const outer = this.size
        const inner = this.innerRadius
        return n * outer * inner * Math.sin(Math.PI / n)
    }

    private get innerRadius(): number {
        return this.size * StarShape.INNER_RATIO
    }

}