import { COL_LENGTH, ROW_LENGTH } from "./map"

export function tileWidth() {
  return Math.ceil(window.innerWidth / COL_LENGTH)
}

export function tileHeight() {
  return Math.ceil(window.innerHeight / ROW_LENGTH)
}
