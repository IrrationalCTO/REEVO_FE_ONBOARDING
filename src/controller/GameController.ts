import type { Ticker } from "pixi.js";
import type { Shape } from "../shapes/base/Shape"
import type { GameView } from "../view/GameView"
import { ShapeFactory } from "../shapes/factory/ShapeFactory";
import { config } from "../config";
import { ShapePool } from "../shapes/factory/ShapePool";

export class GameController {
    private readonly view: GameView
    private readonly pallette: number[]
    private readonly shapes = new Set<Shape>()
    private readonly pool = new ShapePool

    private gravity: number = config.GRAVITY
    private shapesPerSecond: number = config.SHAPES_PER_SECOND
    private spawnTimer = 0

    constructor (view: GameView, pallette: number[]) {
        this.pallette = pallette
        this.view = view
        this.view.onAreaClick((x, y) => this.spawnAt(x, y))
    }

    private spawnAt(x: number, y: number): void {
        const shape = this.pool.acquire(
        'irregular',
        ShapeFactory.pick(this.pallette),
        ShapeFactory.randomSize()
    )
    this.addShape(shape, x, y)
    }

    public update(ticker: Ticker): void {
        this.handleSpawning(ticker.deltaMS)
        this.updateShapes(ticker.deltaTime)
    }

    public addShape(shape: Shape, x: number, y: number): void {
        shape.position.set(x, y)
        this.shapes.add(shape)
        this.view.shapesLayer.addChild(shape)
        shape.eventMode = 'static'
        shape.cursor = 'pointer'
        shape.on('pointerdown', () => this.removeShape(shape))
    }

    public removeShape(shape: Shape): void {
        shape.removeAllListeners()
        this.shapes.delete(shape)
        this.pool.release(shape)
    }

    private handleSpawning(deltaMS: number): void {
        this.spawnTimer += deltaMS
        const interval = 1000 / this.shapesPerSecond
        while (this.spawnTimer >= interval) {
            this.spawnTimer -= interval
            this.spawnRandomShape()
        }
    }

    private spawnRandomShape(): void {
        const shape = this.pool.acquire(
        ShapeFactory.randomType(),
        ShapeFactory.pick(this.pallette),
        ShapeFactory.randomSize()
)
        const margin = config.MAX_SHAPE_SIZE
        const x = margin + Math.random() * (config.AREA_WIDTH - margin * 2)
        const y = -margin // starts fully above the top edge
        this.addShape(shape, x, y)
    }

    private updateShapes(deltaTime: number): void {
        for (const shape of this.shapes) {
            shape.updateGravity(this.gravity, deltaTime)
            if (this.isBelowArea(shape)) this.removeShape(shape)
        }
    }

    private isBelowArea(shape: Shape): boolean {
        return shape.y - config.MAX_SHAPE_SIZE > config.AREA_HEIGHT
    }
}