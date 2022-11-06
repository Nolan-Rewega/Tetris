import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Shape} from "../../Shape";

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input() m_shape!: Shape;

  // -- DOM objects viewers
  @ViewChild('grid', {static: false})m_grid!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit():void{
    this.generateShapeHTML();
  }

  private generateShapeHTML(): void{
    // -- Generate Shape HTML via DOM manipulation.
    const rows:number = this.m_shape.getHeight();
    const cols:number = this.m_shape.getWidth(); 
    const color:string = this.m_shape.getColor();
    const cells:number[][] = this.m_shape.getShapeCells();

    for(let r:number = 0; r < rows; r++){
      for(let c:number = 0; c < cols; c++){
        // -- I had to manually set the style because when I added a CSS Class 
        //    as below, no styling would show, even though the class was in 
        //    shape.component.css
        const element:HTMLDivElement = document.createElement("div");
        //element.classList.add("Filled");
        element.style.width ="20px";
        element.style.height ="20px";
        element.style.backgroundColor = color;
        element.style.opacity = `${cells[r][c]}`;

        // -- Set the number of columns in grid to the number of columns
        //    of the tetris piece.
        var len:number = cells[0].length;
        this.m_grid.nativeElement.style.gridTemplateColumns = `repeat(${len}, 1fr)`;
        this.m_grid.nativeElement.append(element);
      }
    }
  }

}
