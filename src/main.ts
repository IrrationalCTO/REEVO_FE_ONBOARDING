import { Application } from 'pixi.js'
import { config } from './config';
import "./style.css"
import { ERROR_MESSAGES } from './errorMessages'
import { getInitialTheme } from './theme';
import { GameView } from './view/GameView';
import { GameController } from './controller/GameController';
import { HudView } from './view/HudView';
import { ControlsView } from './view/ControlsView';



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
  
  const appContainer = document.querySelector<HTMLElement>("#app")
  if (!appContainer) {
    throw new Error (ERROR_MESSAGES.ELEMENT_NOT_FOUND("#app"))
  }

  appContainer.appendChild(app.canvas)
  
  const gameView = new GameView(config.AREA_WIDTH, config.AREA_HEIGHT, theme)
  gameView.position.set(config.AREA_PADDING, config.AREA_PADDING)

  app.stage.addChild(gameView)

  const controller = new GameController(gameView, theme.shapePallete)
  const hud = new HudView(appContainer)

  controller.onStatsChange((count, area) => hud.update(count, area))
  
  const controls = new ControlsView(appContainer)
  controls.addControl('Shapes/sec', controller.spawnRate, (d) => controller.changeSpawnRate(d))
  controls.addControl('Gravity', controller.currentGravity, (d) => controller.changeGravity(d), 2)
  
  app.ticker.add((ticker) => controller.update(ticker))
}

bootstrap().catch(console.error)
