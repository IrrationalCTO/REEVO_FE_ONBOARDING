import { Container, Graphics } from 'pixi.js'
import { COLORS} from '../theme'

export class GameView extends Container {

 public readonly shapesLayer = new Container()
 private readonly background = new Graphics()
 private readonly areaMask = new Graphics()
 private readonly areaWidth: number;
 private readonly areaHeight: number;


 constructor(areaWidth: number, areaHeight: number) {
    super();
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;

    this.drawBackground();
    this.setUpMask()
    this.shapesLayer.mask = this.areaMask
    
    this.addChild(this.background, this.shapesLayer, this.areaMask)
 }

 private drawBackground(): void {
    this.background.rect(0, 0, this.areaWidth, this.areaHeight)
    .fill(COLORS.WHITE)
    .stroke({width: 1, color: COLORS.BLACK})
 }

 private setUpMask(): void {
    this.areaMask.rect(0, 0, this.areaWidth, this.areaHeight)
    .fill(COLORS.PAGE_BG)
 }

}


