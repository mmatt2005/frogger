import { MOVEMENT_SPEED, PLAYER_SIZE } from "./constant"
import { tileMap } from "./main"

export class Player {
    constructor(startingX: number, startingY: number) {
        this.x = startingX
        this.y = startingY
        this.listener()
    }
    size: number = PLAYER_SIZE
    color: string = "black"
    x: number
    y: number
    image: HTMLImageElement | null = null;


    listener() {
        window.addEventListener("keypress", event => {
            if (event.key === "w" && this.isInYBounds(this.y - MOVEMENT_SPEED)) {
                this.y -= MOVEMENT_SPEED
            } else if (event.key === "a" && this.isInXBounds(this.x - MOVEMENT_SPEED)) {
                this.x -= MOVEMENT_SPEED
            } else if (event.key === "s" && this.isInYBounds(this.y + MOVEMENT_SPEED + this.size)) {
                this.y += MOVEMENT_SPEED
            } else if (event.key === "d" && this.isInXBounds(this.x + this.size)) {
                this.x += MOVEMENT_SPEED
            }
        })
    }

    /**
     * 3/30/25
     * @description checks to see if the player is off the screen in the x direction
     *
     * @param {number} newX 
     * @returns {boolean} 
     */
    isInXBounds(newX: number): boolean {
        if (newX < 0) return false
        if (newX > window.innerWidth) return false
        return true
    }


    /**
     * @description checks to see if the player is off the screen in the y direction
     *
     * @param {number} newY 
     * @returns {boolean} 
     */
    isInYBounds(newY: number): boolean {
        if (newY < 0) return false
        if (newY > window.innerHeight) return false
        return true

    }

    setImage() { 
        this.image = tileMap.getTile("player.png")?.img || null
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        if (this.image) { 
            context.drawImage(this.image, this.x, this.y)
        }
    }
}