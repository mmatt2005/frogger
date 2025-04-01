import { walkableTileRow, roadTileRow } from "./tileMap"


export type TileSrc = "grass.png" | "road.jpg" | "car.png" | "player.png"
export interface TileCache {
  name: TileSrc
  img: HTMLImageElement
}

export type RowValue = "w" | "r" | 1
export type Row = [RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue]
export type Map = [Row, Row, Row, Row, Row, Row, Row, Row, Row, Row]

export const ROW_LENGTH = 10
export const COL_LENGTH = 10
export const TILES: TileSrc[] = ["grass.png", "road.jpg", "car.png", "player.png"]

export const map: Map = [
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
