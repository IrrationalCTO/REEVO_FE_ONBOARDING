import { Application } from 'pixi.js'
import { config } from './config';
import "./style.css"
import { ERROR_MESSAGES } from './errorMessages'
import { getInitialTheme } from './theme';
import { GameView } from './view/GameView';

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
}

bootstrap().catch(console.error)
