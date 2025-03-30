import { PLAYER_SIZE } from './constant'
import { Player } from './player'
import './style.css'
import { roadTileRow, walkableTileRow } from './tile'
const canvas = document.querySelector("canvas")!
const context = canvas.getContext("2d")!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = "black"

const ROW_LENGTH = 10
const COL_LENGTH = 10

export type RowValue = "w" | "r" | 1
export type Row = [RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue]
export type Map = [Row, Row, Row, Row, Row, Row, Row, Row, Row, Row]

const map: Map = [
  walkableTileRow(),
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  roadTileRow(),
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  walkableTileRow()
]


export type TileSrc = "grass.png" | "road.jpg"
export interface TileCache {
  name: TileSrc
  img: HTMLImageElement
}

const TILES: TileSrc[] = ["grass.png", "road.jpg"]

export class Game {
  constructor() {
    this.player = new Player(0, window.innerHeight - PLAYER_SIZE)
    this.loadTiles()
  }


  async loadTiles() {
    console.time("All tiles loaded")
    const loadedTiles = TILES.map(tile => new Promise<TileCache>((resolve, reject) => {
      const image = new Image()
      console.time(tile)
      image.src = tile

      image.onload = () => {
        console.timeEnd(tile)
        this.tileCache.push({ name: tile, img: image })
        resolve({ name: tile, img: image })
      }

      image.onerror = () => {
        console.log(`Failed to load tile: ${tile}`)
        reject()
      }
    }))

    await Promise.all(loadedTiles)
    console.timeEnd("All tiles loaded")

    // Start the game loop after all tiles have been loaded.
    this.loop()
  }

  getTile(tileName: TileSrc): TileCache | null { 
    return this.tileCache.find(({name}) => name === tileName) || null
  }

  drawTile(tileName: TileSrc, x: number, y: number, width: number, height: number) {
    const tile = this.getTile(tileName)
    if (tile) {
      context.drawImage(tile.img, x, y, width, height)
    }
  }


  drawMap() {
    const width = Math.ceil(window.innerWidth / COL_LENGTH)
    const height = Math.ceil(window.innerHeight / ROW_LENGTH)

    for (let row = 0; row < ROW_LENGTH; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const x = width * col
        const y = height * row
        const rowValue: RowValue = map[row][col]

        if (rowValue === "w") {
          this.drawTile("grass.png", x, y, width, height)
        } else if (rowValue === "r") {
          this.drawTile("road.jpg", x, y, width, height)
        }

        this.drawDebug(x, y, row, col, width, height)
      }
    }
  }

  tileCache: TileCache[] = []
  player: Player


  loop() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.draw()

    window.requestAnimationFrame(() => this.loop())
  }



  draw() {
    this.drawMap()

    this.player.draw(context)
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
}

new Game()