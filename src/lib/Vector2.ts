export class Vector2 {
  x:number = 0;
  y:number = 0;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  magnitude = ():number => {
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) )
  }

  distance = (v2:Vector2):number => {
    return Math.sqrt( Math.pow(this.x - v2.x, 2) + Math.pow(this.y - v2.y, 2) );
  }

  add = (v2:Vector2):Vector2 => {
    return new Vector2(this.x + v2.x, this.y + v2.y);
  }

  ZERO = ():Vector2 => {
    return new Vector2(0,0);
  }
}