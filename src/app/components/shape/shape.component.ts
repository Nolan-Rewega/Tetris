import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  // -- A nxm number array of filled shape cells.
  m_cells: number[][] = [[]];

  // -- Input parameters.
  @Input() m_type: string = "";
  @Input() m_color: string = "";
  @Input() m_origin: [number, number] = [0,0];

  // -- DOM objects viewers
  @ViewChild('grid', {static: false})m_grid!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.setCells(this.m_type);
  }

  ngAfterViewInit():void{
    this.rotateShape(false);
    this.generateShapeHTML();
  }

  public translateShape(translateRight:boolean): void{
    this.m_origin[1] += (translateRight) ? 1 : -1;
  }


  public rotateShape(clockwise:boolean): void{
    const rows = this.m_cells.length;
    const cols = this.m_cells[0].length; 

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

    console.log(rotated);
    this.m_cells = rotated;

  }


  public removeRow(row:number): void{
    let targetRow = this.m_origin[0] - row; 
    // -- Remove the row, and increase the origin 
    this.m_cells.splice(targetRow, 1);
    this.m_origin[0]++;
  }


  private setCells(type:string): void{
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


  private generateShapeHTML(): void{
    // -- Generate tetris piece via DOM manipulation.
    const rows = this.m_cells.length;
    const cols = this.m_cells[0].length; 

    for(let r:number = 0; r < rows; r++){
      for(let c:number = 0; c < cols; c++){
        // -- I had to manually set the style because when I added a CSS Class 
        //    as below, no styling would show, even though the class was in 
        //    shape.component.css
        const element = document.createElement("div");
        //element.classList.add("Filled");
        element.style.width ="20px";
        element.style.height ="20px";
        element.style.backgroundColor = this.m_color;
        element.style.opacity = `${this.m_cells[r][c]}`;

        // -- Set the number of columns in grid to the number of columns
        //    of the tetris piece.
        var len = this.m_cells[0].length;
        this.m_grid.nativeElement.style.gridTemplateColumns = `repeat(${len}, 1fr)`;
        this.m_grid.nativeElement.append(element);
      }
    }
  }

}
