import { Collidable } from './collidable'
import { player, tileMap } from './main'
import { tileHeight } from './utils'

export class Vehicle extends Collidable {
    constructor(
        startingX: number,
        startingY: number,
        removeVehicle: (removedVehicle: Vehicle) => void,
    ) {
        super()
        this.x = startingX
        this.y = startingY + (tileHeight() / 2) - (this.size / 2)
        this.removeVehicle = removeVehicle

        this.image = tileMap.getTile("car.png")?.img!
    }


    x: number
    y: number
    speed: number = 3
    color: string = "red"
    size: number = 35
    image: HTMLImageElement


    moveDirection: "left" | "right" = "right"
    removeVehicle: (removedVehicle: Vehicle) => void


    setMoveDirection(newDirection: "left" | "right") {
        this.moveDirection = newDirection
    }

    moveLeft() {
        if (this.x <= 0) return this.setMoveDirection("right")

        this.x -= this.speed
    }

    moveRight() {
        if ((this.x + this.size) >= window.innerWidth) return this.setMoveDirection("left")

        this.x += this.speed

    }


    draw(context: CanvasRenderingContext2D) {
        if (this.moveDirection === "right") {
            this.moveRight()
        } else {
            this.moveLeft()
        }
        this.isColidingWithPlayer(player, this)
        context.drawImage(this.image, this.x, this.y)
    }
}