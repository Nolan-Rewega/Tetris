import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Shape} from "../../Shape";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  m_activeShape:Shape = new Shape("Z", "Darkblue");
  m_activeShapePos: [number, number] = [0, 4];

  m_board:number[][] = [];
  m_rows:number = 20;
  m_cols:number = 10;

  @ViewChild ("board") m_boardHTML!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    // -- Initalize the board.
    for(let r:number = 0; r < this.m_rows; r++){
      this.m_board.push((new Array<number>(10)).fill(0));
    }
  }


  ngAfterViewInit(): void{
    this.generateBoardHTML();
  }


  public translateShapeY(): void{
    var height:number = this.m_activeShape.getHeight();
    if(this.m_activeShapePos[0] + height > this.m_rows - 1){
      // -- prep next shape.
      return;
    }

    this.removeShape();
    this.m_activeShapePos[0] += 1;

    // On shape overlap, revert translation
    // adding the shape back onto m_board.
    if(!this.addShape()){
      this.m_activeShapePos[1] -= 1;
      this.addShape();

      // -- prep next shape
      // -- check for tetris,
    }

  }


  public translateShapeX(deltaX:number): void{
    var width:number = this.m_activeShape.getWidth();

    // -- Fail conditions.
    // Out of bounds checking
    if(this.m_activeShapePos[1] + deltaX > this.m_cols - width) { return; }
    if(this.m_activeShapePos[1] + deltaX < 0) { return; }

    this.removeShape();
    this.m_activeShapePos[1] += deltaX;

    // On shape overlap, revert translation
    // adding the shape back onto m_board.
    if(!this.addShape()){
      this.m_activeShapePos[1] -= deltaX;
      this.addShape();
    }

  }


  public rotateShape(clockwise:boolean): void{
    var oldWidth:number = this.m_activeShape.getWidth();
    var oldHeight:number = this.m_activeShape.getHeight();
    var newWidth:number = (oldWidth > oldHeight) ? oldHeight : oldWidth;

    // -- fail conditions.
    // if the new width pokes outside of board.
    if(this.m_activeShapePos[1] + newWidth > this.m_cols){ return; }

    this.removeShape();
    this.m_activeShape.rotateShape(clockwise);

    // On shape overlap, revert rotation
    // adding the shape back onto m_board.
    if(!this.addShape()){
      this.m_activeShape.rotateShape(!clockwise);
      this.addShape();
    }
  }


  private checkFullRow(start:number, end:number){
    // -- 0 <= Start <= end < m_rows;
    var rowsToRemove:number[] = [];

    for(let r:number = start; r <= end; r++){
      var removeRow:boolean = true;

      this.m_board[r].forEach( shape => {
        if(shape == 0){ removeRow = false; }
      });

      if(removeRow) {rowsToRemove.push(r);}
    }

    // -- TODO: Allocate score. if rows are full

    rowsToRemove.forEach(row => this.removeRow(row));
  }


  private addShape(): boolean{
    var r:number = this.m_activeShapePos[0];
    var c:number = this.m_activeShapePos[1];
    var width:number = this.m_activeShape.getWidth();
    var height:number = this.m_activeShape.getHeight();
    var cells:number[][] = this.m_activeShape.getShapeCells();

    for(let i:number = 0; i < height; i++){
      for(let j:number = 0; j < width; j++){

        if(cells[i][j] == 1 && this.m_board[r+i][c+j] == 1){
          // -- Shape overlap!
          return false;
        }
        else if (cells[i][j] == 1){ 
            this.m_board[r+i][c+j] = cells[i][j]; 
        }
      }
    }

    return true;
  } 


  private removeShape(){
    // -- Sets the shape in the board.
    var r:number = this.m_activeShapePos[0];
    var c:number = this.m_activeShapePos[1];
    var width:number = this.m_activeShape.getWidth();
    var height:number = this.m_activeShape.getHeight();
    var cells:number[][] = this.m_activeShape.getShapeCells();

    for(let i:number = 0; i < height; i++){
      for(let j:number = 0; j < width; j++){
        if(cells[i][j] == 1){ 
          this.m_board[r+i][c+j] = 0; 
        }
      }
    }
  } 


  private removeRow(row:number): void{
    // -- Remove the row and add a new empty row.
    this.m_board.splice(row, 1);
    this.m_board.unshift((new Array<number>(this.m_cols)).fill(0));
  }


  // -- HTML function.
  private generateBoardHTML(): void{
    this.m_board.forEach(row => { row.forEach(shape =>{
      const element:HTMLDivElement = document.createElement("div");
      element.style.backgroundColor = (shape == 1) ? "darkgreen" : "grey";

      this.m_boardHTML.nativeElement.append(element); 
      }) 
    });
  }
}
