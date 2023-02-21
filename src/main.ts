import { Tile, TILETYPE } from "./lib/Tile";
import { Tilemap, TilemapType } from "./lib/Tilemap";
import { rand, randrange, randrange_i } from "./lib/Util";
import { Vector2 } from "./lib/Vector2";

var MapWidth:number = 32,
    MapHeight:number = 16;

var TownCount:number = 2,
    TownLowerXSize:number = 2,
    TownUpperXSize:number = 4,
    TownLowerYSize:number = 2,
    TownUpperYSize:number = 4;

var ForestCount:number = 3,
    ForestWidth:number = 5,
    ForestHeight:number = 4,
    ForestDensity:number = 4.0;

var MountainThickness:number = 2,
    MountainCaveCount:number = 2;
    

// -- Initialize tilemaps --

var tilemap = new Tilemap(MapWidth, MapHeight, TilemapType.NORMAL);
var tilemap_cave = new Tilemap(MapWidth, MapHeight, TilemapType.CAVE);


/* The generateStructure method of the Tilemap class takes 5 arguments.
 * The first two arguments are numbers determining the width and height of the structure respectively.
 * The third is a Vector2 containing the position of the top left corner of the structure. In the below examples,
 * there are adjustments being done to the positions so they are pushed away from the edge of the map.
 * The fourth is a number representing the structure's "density".
 * Finally, the fifth is a TILETYPE (defined in Tile.ts), which determines which tile to use for the structure.
 *
 * Essentially, this generates a rectangular area. The density affects the randomness of whether or not to
 * place a tile when generating the structure - for each single tile, there is a chance it won't get placed. This is
 * to give the structure a more natural, random look. Higher numbers increase the chance that the tile will get placed.
 */

// -- Generate stuff in the Overworld tilemap --

//Generate towns and some water patches
for (var i:number = 0; i < TownCount; i++) {
  //Towns
  tilemap.generateStructure(randrange_i(TownLowerXSize, TownUpperXSize), randrange_i(TownLowerYSize, TownUpperYSize), new Vector2( rand(tilemap.width - 4) + 1, rand(tilemap.height - 4) + 1 ), 32.0, TILETYPE.TOWN);
  
  //Water
  tilemap.generateStructure(rand(4)+1, rand(2)+1, new Vector2( rand(tilemap.width - 4) + 1, rand(tilemap.height - 4) + 1 ), 32.0, TILETYPE.WATER);
}

//Generate forests
for (var i:number = 0; i < ForestCount; i++) {
  tilemap.generateStructure(ForestWidth, ForestHeight, new Vector2( rand(tilemap.width - 4), rand(tilemap.height - 4) ), ForestDensity, TILETYPE.FOREST);
}

//Generate "boss" tile (will only be a single tile)
tilemap.generateStructure(1, 1, new Vector2( rand(tilemap.width - 2), rand(tilemap.height - 2) ), 100.0, TILETYPE.BOSS);

//Generate mountains (basically a border around the map)
tilemap.generateMountains(MountainThickness, MountainCaveCount);


// -- Generate stuff in the Cave tilemap --

//Generate random bits of road inside the cave
tilemap_cave.generateStructure(ForestWidth, ForestHeight, new Vector2( rand(tilemap.width - 4), rand(tilemap.height - 4) ), ForestDensity, TILETYPE.ROAD);


// -- Render the tilemaps --

console.log("-- Overworld --");
tilemap.render();

console.log("-- Cave --");
tilemap_cave.render();