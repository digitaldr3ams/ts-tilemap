import { Tilemap } from "./Tilemap";
import { Vector2 } from "./Vector2";

export enum TILETYPE {
  NULL,
  AIR,
  GRASS,
  ROAD,
  FOREST,
  MOUNTAIN,
  BOSS,
  CAVE_OPENING,
  TOWN,
  WATER
}

export class Tile {
  parentMap:Tilemap;
  position:Vector2;
  type:TILETYPE;

  constructor(x:number, y:number, type:TILETYPE, parentMap:Tilemap) {
    this.position = new Vector2(x,y);
    this.type = type;
    this.parentMap = parentMap;
  }

  isAdjacentToTileType = (type:TILETYPE):boolean => {
    return this.parentMap.getTile(this.position.x, this.position.y - 1).type == type ||
           this.parentMap.getTile(this.position.x, this.position.y + 1).type == type ||
           this.parentMap.getTile(this.position.x - 1, this.position.y).type == type ||
           this.parentMap.getTile(this.position.x + 1, this.position.y).type == type;
  }

  isInvalid = ():boolean => {
    return this.type == TILETYPE.NULL;
  }

  toString = ():String => {
    switch (this.type) {
      case TILETYPE.AIR: return " ";
      case TILETYPE.GRASS: return ".";
      case TILETYPE.ROAD: return "-";
      case TILETYPE.FOREST: return "#";
      case TILETYPE.MOUNTAIN: return "M";
      case TILETYPE.BOSS: return "B";
      case TILETYPE.CAVE_OPENING: return "O";
      case TILETYPE.TOWN: return "T";
      case TILETYPE.WATER: return "~";
      default: return "?";
    }
  }
}