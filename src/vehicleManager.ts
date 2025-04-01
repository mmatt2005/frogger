import { Vehicle } from "./vehicle";

export class VehicleManager {

    vehicles: Vehicle[] = []

    addVehicle(addedVehicle: Vehicle) {
        this.vehicles.push(addedVehicle)
    }

    removeVehicle(removedVehicle: Vehicle) {
        this.vehicles = this.vehicles.filter(({ id }) => id !== removedVehicle.id)
    }


    /**
     * @description draws all the vehicles
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context: CanvasRenderingContext2D) {
        this.vehicles.forEach(vehicle => vehicle.draw(context))
    }
}