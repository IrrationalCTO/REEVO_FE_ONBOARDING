# Falling Shapes

PixiJS v8 + TypeScript + Vite. Random shapes fall under gravity inside a masked area.

## Run
npm install
npm run dev

## Features
- 1 shape/sec at a random X, starting above and ending below the area (masked)
- Shapes: triangle, square, pentagon, hexagon, circle, ellipse, star, random colours
- Click empty area → spawns an irregular shape; click a shape → removes it
- HTML HUD: shape count and total area (px²)
- HTML +/- controls for shapes/sec and gravity
- Scales to mobile screens, touch supported

## Architecture
src/
  controller/ -> GameController – spawning, gravity cleanup, input
  view/       -> GameView (Pixi), HudView + ControlsView (HTML)
  shapes/     -> base/Shape, types/*, factory/ShapeFactory + ShapePool
  theme/      -> light & dark themes
  config.ts   -> all tunable values

## Patterns
- MVC – controller owns logic, views only render
- Factory – ShapeFactory creates shapes by type
- Object Pool – ShapePool reuses shapes instead of destroying them
- Observer – controller notifies the HUD when stats change
- Polymorphism – each Shape implements draw() and getArea()