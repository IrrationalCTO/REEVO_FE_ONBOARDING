import { Application } from 'pixi.js'
import { config } from './config';
import "./style.css"
import { ERROR_MESSAGES } from './errorMessages'
import { getInitialTheme } from './theme';
import { GameView } from './view/GameView';
import { CircleShape } from './shapes/types/CircleShape';
import { EllipseShape } from './shapes/types/EllipseShape';
import { Shape } from './shapes/base/Shape';

async function bootstrap() {

  const theme = getInitialTheme()
  document.body.style.background = `#${theme.pageBackground.toString(16).padStart(6,'0')}`

  const app = new Application();
  await app.init({
     width: config.AREA_WIDTH + config.AREA_PADDING * 2,
     height: config.AREA_HEIGHT + config.AREA_PADDING * 2,
     background: theme.pageBackground,
     antialias: true,
     autoDensity: true,
     resolution: window.devicePixelRatio
  })
  
  const appContainer = document.querySelector("#app")
  if (!appContainer) {
    throw new Error (ERROR_MESSAGES.ELEMENT_NOT_FOUND("#app"))
  }

  appContainer.appendChild(app.canvas)
  const gameView = new GameView(config.AREA_WIDTH, config.AREA_HEIGHT, theme)
  gameView.position.set(config.AREA_PADDING, config.AREA_PADDING)

  app.stage.addChild(gameView)

  //random color
  const randomColor = () => theme.shapePallete[Math.floor(Math.random() * theme.shapePallete.length)];

  const shapes = new Set <Shape>();
  const circle = new CircleShape(randomColor(), 30) 
  const ellipse = new EllipseShape(randomColor(), 25)
  
  shapes.add(circle)
  shapes.add(ellipse)

  circle.x = config.AREA_WIDTH / 2
  circle.y = -30
  gameView.shapesLayer.addChild(circle)

  app.ticker.add((ticker) => {
    circle.updateGravity(config.GRAVITY, ticker.deltaTime)
  })
}

bootstrap().catch(console.error)
