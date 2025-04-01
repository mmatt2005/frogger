import { PLAYER_SIZE } from './constant'
import { ROW_LENGTH, RowValue, map } from './map'
import { Player } from './player'
import './style.css'
import { TileMap } from './tileMap'
import { tileHeight, tileWidth } from './utils'
import { Vehicle } from './vehicle'
import { VehicleManager } from './vehicleManager'

const canvas = document.querySelector("canvas")!
const context = canvas.getContext("2d")!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = "black"


export const tileMap = new TileMap()
export const player = new Player((window.innerWidth / 2) + (PLAYER_SIZE / 2), window.innerHeight - PLAYER_SIZE)
export const vehicleManager = new VehicleManager()

export class Game {
  constructor() {
    // Once all the tiles have been loaded start the game loop.
    tileMap.onAllTilesLoaded = () => {
      this.loop()
      vehicleManager.addVehicle(new Vehicle(0, tileMap.findTileRow("r") || 0, vehicleManager.removeVehicle))
      player.setImage()
    }
  }
  paused: boolean = false

  pauseGame() { 
    this.paused = true 
  }

  resumeGame() { 
    this.paused = false
    window.requestAnimationFrame(this.loop)
  }


  loop = () => {
    if (this.paused) return console.log("GAME Paused!")

    context.clearRect(0, 0, canvas.width, canvas.height)
    this.draw()

    window.requestAnimationFrame(this.loop)
  }


  draw() {
    this.drawMap()
    player.draw(context)
    vehicleManager.draw(context)
  }

  drawDebug(x: number, y: number, row: number, col: number, width: number, height: number) {
    const FONT_SIZE = 18
    context.fillStyle = "black"
    context.textBaseline = "top"
    context.font = `${FONT_SIZE}px serif`

    context.fillText(`(${x}, ${y})`, (x + 5), (y + 5))
    context.fillText(`row: ${row} col: ${col}`, (x + 5), (y + 5) + (FONT_SIZE + 2))

    context.strokeStyle = "white"
    context.strokeRect(x, y, width, height)
  }

  drawMap() {
    const width = tileWidth()
    const height = tileHeight()

    for (let row = 0; row < ROW_LENGTH; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const x = width * col
        const y = height * row
        const rowValue: RowValue = map[row][col]

        if (rowValue === "w") {
          tileMap.drawTile(context, "grass.png", x, y, width, height)
        } else if (rowValue === "r") {
          tileMap.drawTile(context, "road.jpg", x, y, width, height)
        } else {
          context.fillStyle = "darkgray"
          context.fillRect(x, y, width, height)
        }

        this.drawDebug(x, y, row, col, width, height)
      }
    }
  }
}

export const game = new Game()