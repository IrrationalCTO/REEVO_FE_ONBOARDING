import { Container, Graphics } from 'pixi.js'
import type { Theme } from '../theme'

export class GameView extends Container {

 public readonly shapesLayer = new Container()
 private readonly background = new Graphics()
 private readonly areaMask = new Graphics()
 private readonly areaWidth: number;
 private readonly areaHeight: number;
 private readonly theme: Theme

 constructor(areaWidth: number, areaHeight: number, theme: Theme) {
    super();
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
    this.theme = theme

    this.drawBackground();
    this.setUpMask()
    this.shapesLayer.mask = this.areaMask
    
    this.addChild(this.background, this.shapesLayer, this.areaMask)
 }

 private drawBackground(): void {
    this.background.rect(0, 0, this.areaWidth, this.areaHeight)
    .fill(this.theme.areaFill)
    .stroke(this.theme.areaBorder)
 }

 private setUpMask(): void {
    this.areaMask.rect(0, 0, this.areaWidth, this.areaHeight)
    .fill(0xffffff)
 }

}


