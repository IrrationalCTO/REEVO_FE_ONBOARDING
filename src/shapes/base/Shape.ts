import { Graphics } from "pixi.js";

abstract class Shape extends Graphics {

 protected color: number
 protected size: number 
 public velocityY: number = 0

 constructor(color: number, size: number) {
    super()
    this.size = size
    this.color = color
    this.draw()
 }

 protected abstract draw(): void;
 public abstract getArea(): number

 // is called on every frame update, more gravity makes it fall faster
 public updateGravity(gravity: number, deltaTime: number): void {
    this.velocityY += gravity * deltaTime //speed
    this.y += this.velocityY * deltaTime  //position
 }

}