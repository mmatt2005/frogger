import { v4 as uuidv4 } from "uuid";
import { Player } from "./player";
import { Vehicle } from "./vehicle";
import { game } from "./main";

export type CollidableObject = Vehicle

export class Collidable {

    id: string = uuidv4()


    isColidingWithPlayer(player: Player, collidableObject: CollidableObject) {
        // Check for overlap in the X axis
        const isOverlappingX = (collidableObject.x + collidableObject.size + (collidableObject.size / 2)) >= player.x && (collidableObject.x + (collidableObject.size / 2)) <= (player.x + player.size);

        // Check for overlap in the Y axis
        const isOverlappingY = (collidableObject.y + collidableObject.size) >= player.y && collidableObject.y <= (player.y + player.size);

        if (isOverlappingX && isOverlappingY) {
            collidableObject.size = 100
            collidableObject.color = "pink"

            game.pauseGame()

            setTimeout(() => { 
                console.log("Resume game...")
                game.resumeGame()
            }, 2000)
        }
    }
}