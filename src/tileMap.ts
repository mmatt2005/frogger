import { map, Row, RowValue, TileCache, TILES, TileSrc } from "./map"
import { tileHeight } from "./utils"
export function walkableTileRow(): Row {
    return ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
}

export function roadTileRow(): Row {
    return ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r"]
}

export class TileMap {
    constructor() {
        this.loadTiles()
    }

    tileCache: TileCache[] = []


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

        this.onAllTilesLoaded()
    }

    onAllTilesLoaded() {}

    getTile(tileName: TileSrc): TileCache | null {
        return this.tileCache.find(({ name }) => name === tileName) || null
    }

    drawTile(context: CanvasRenderingContext2D, tileName: TileSrc, x: number, y: number, width: number, height: number) {
        const tile = this.getTile(tileName)
        if (tile) {
            context.drawImage(tile.img, x, y, width, height)
        }
    }


    findTileRow(rowValue: RowValue) { 
        let tileRow: number | null = null
        for (let row = 0; row < map.length; row++) { 

            if (map[row].includes(rowValue)) { 
                tileRow = row * tileHeight()
                break
            }
        }

        return tileRow
    }
}