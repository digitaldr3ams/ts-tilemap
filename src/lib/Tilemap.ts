import { Tile, TILETYPE } from "./Tile";
import { Vector2 } from "./Vector2";

var MIN_WIDTH:number = 8;
var MIN_HEIGHT:number = 8;

export enum TilemapType {
  NORMAL,
  CAVE
}

export class Tilemap {
  width:number;
  height:number;
  environmentType:TilemapType;
  map:Array<Array<Tile>>;

  constructor(width:number, height:number, environmentType:TilemapType) {
    this.width  = Math.max(MIN_WIDTH, Math.floor(width))
    this.height = Math.max(MIN_HEIGHT, Math.floor(height))
    this.environmentType = environmentType;

    if (environmentType == TilemapType.NORMAL)
      this.map = this.initiateMap(TILETYPE.GRASS);
    else
      this.map = this.initiateMap(TILETYPE.AIR);
  }

  //Create a map pre-populated with a given default tile type.
  //Respects the width and height of this Tilemap.
  //Does not modify any existing variables of this class, but returns a map instead.
  initiateMap = (defaultTile:TILETYPE):Array<Array<Tile>> => {

    //Initialize variables
    var x:number = 0;
    var y:number = 0;
    var map = new Array<Array<Tile>>(); //Blank map

    //Begin navigating the 2D array (this will be going down the Y-axis)
    for (;y < this.height; y++) {

      //Insert a blank row at the current Y position
      map.push([]);

      //Traverse across this new blank row (left-to-right across the X-axis)
      for (x = 0; x < this.width; x++) {
        //Append a new tile to the end of the current row using the default tile type
        map[y].push(new Tile(x, y, defaultTile, this));
      }

    }

    //Return the newly created map
    return map;
    
  }

  //Short way to get a specific tile at the given x,y position.
  //Returns a false tile with the NULL tile type if it is out-of-bounds.
  getTile = (x:number, y:number):Tile => {
    if (x < 0 || x >= this.width) return new Tile(0, 0, TILETYPE.NULL, this);
    if (y < 0 || y >= this.height) return new Tile(0, 0, TILETYPE.NULL, this);
    return this.map[y][x];
  }

  setTileType = (x:number, y:number, tiletype:TILETYPE):void => {
    this.map[y][x].type = tiletype;
  }

  generateStructure = (width:number, height:number, position:Vector2, density:number, tiletype:TILETYPE):void => {
    var center:Vector2 = new Vector2(Math.floor(width/2), Math.floor(height/2)).add(position);
    var x:number = position.x,
        y:number = position.y;
    
    for (; y < position.y + height && y < this.height; y++) {
      for (x = position.x; x < position.x + width && x < this.width; x++) {
        if (Math.random() <= density/center.distance( position.add(new Vector2(x,y)) )) {
          this.setTileType(x, y, tiletype);
        }
      }
    }
  }

  generateMountains = (thickness:number, caveCount:number):void => {
    thickness = Math.max(1, thickness);

    var caves:number = 0;

    var x:number = 0,
        y:number = 0;

    var y_lowerBound:number = thickness - 1,
        y_upperBound:number = this.height - thickness,
        x_lowerBound:number = thickness - 1,
        x_upperBound:number = this.width - thickness;

    for (;y < this.height; y++) {

      for (x = 0; x < this.width; x++) {
        if (y <= y_lowerBound || y >= y_upperBound ||
            x <= x_lowerBound || x >= x_upperBound) {
            this.setTileType(x,y,TILETYPE.MOUNTAIN);
          }
        }
    }

    //Redo to place caves
    for (y = 0;y < this.height; y++) {

      for (x = 0; x < this.width; x++) {
        if (y <= y_lowerBound || y >= y_upperBound ||
          x <= x_lowerBound || x >= x_upperBound) {
            if (caves < caveCount && Math.random() < 0.3 && this.getTile(x,y).isAdjacentToTileType(TILETYPE.GRASS)) {
              caves++;
              this.setTileType(x,y,TILETYPE.CAVE_OPENING);
            }
          }
      }

    }

  }

  //Prints the full map out to the console.
  render = () => {

    var x:number = 0;
    var y:number = 0;
    var out:string = "";

    //Begin navigating the 2D array again, this loop will descend through the Y-axis
    for (;y < this.height; y++) {

      //Iterate across the X-axis at the current Y
      //Also, clear the "out" string here, because this is the start of a new line
      for (x = 0, out = ""; x < this.width; x++) {
        //Get the string representation of the current tile and append it to "out"
        out += this.getTile(x,y).toString();
      }
      //Print out the current row of tiles
      console.log(out);

    }

  }

}