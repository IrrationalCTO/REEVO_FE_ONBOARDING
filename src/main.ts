import { Application } from 'pixi.js'
import { config } from './config';
import { ERROR_MESSAGES } from './errorMessages'

async function bootstrap() {

  const app = new Application();
  await app.init({
     width: config.AREA_WIDTH,
     height: config.AREA_HEIGHT,
     backgroundColor: 0xf0f0f0,
     antialias: true,
     autoDensity: true,
     resolution: window.devicePixelRatio
  })
  
  const appContainer = document.querySelector("#app")
  if (!appContainer) {
    throw new Error (ERROR_MESSAGES.ELEMENT_NOT_FOUND("#app"))
  }
  appContainer.appendChild(app.canvas)
}

bootstrap().catch(console.error)