export class Shape{
  // -- A nxm number array of filled shape cells.
  private m_cells: number[][];

  private m_type: string;
  private m_color: string;

    constructor(type:string, color:string){
        this.m_type = type;
        this.m_color = color;

        // -- Type selection.
        if(type == "L"){
            this.m_cells = [ [1, 0],
                             [1, 0],
                             [1, 1] ]
        }
        else if(type == "J"){
        this.m_cells = [ [0, 1],
                       [0, 1],
                        [1, 1] ]
        }
        else if(type == "S"){
            this.m_cells = [ [0, 1, 1],
                             [1, 1, 0] ]
        }
        else if(type == "Z"){
            this.m_cells = [ [1, 1, 0],
                             [0, 1, 1] ]
        }
        else if(type == "T"){
            this.m_cells = [ [1, 1, 1],
                             [0, 1, 0] ]
        }
        else if(type == "O"){
            this.m_cells = [ [1, 1],
                             [1, 1] ]
        }
        else if(type == "I"){
            this.m_cells = [ [1],
                             [1],
                             [1],
                             [1] ]
        }
        else{
            throw "Invalid shape type in class ShapeComponent.constructor(type:string).";
        }
    }

    public getWidth(): number{
        return this.m_cells[0].length;
    }
    public getHeight(): number{
        return this.m_cells.length;
    }
    public getColor(): string{
        return this.m_color;
    }
    public getShapeCells(): number[][]{
        return this.m_cells;
    } 



    public rotateShape(clockwise:boolean): void{
        const rows:number = this.m_cells.length;
        const cols:number = this.m_cells[0].length; 

        // -- Define a new Cols x Rows array.  
        var rotated: number[][] = [];

        for(let i:number = 0; i < cols; i++){
            rotated[i] = new Array<number>(rows);
        }

        // -- Fill in new array.
        for(let r:number = 0; r < rows; r++){
            for(let c:number = 0; c < cols; c++){
                if(clockwise){ 
                    rotated[c][rows-1-r] = this.m_cells[r][c]; 
                }
                else{ 
                    rotated[cols-1-c][r] = this.m_cells[r][c]; 
                }
            }
        }
        this.m_cells = rotated;
    }


}