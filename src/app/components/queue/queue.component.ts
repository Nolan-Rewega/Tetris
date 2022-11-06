import { 
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import {Shape} from "../../Shape";
import {ShapeComponent} from "../shape/shape.component";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  @ViewChild("Container", { read: ViewContainerRef }) m_container!: ViewContainerRef;

  m_queue: Shape[] = [];
  m_shapeConfigs: { [key: number]: [string, string] } = {
    0: ["L","blue"], 1: ["J","red"],
    2: ["S","green"], 3: ["Z","yellow"],
    4: ["T","lightblue"], 5: ["O","black"],
    6: ["I","pink"],
  };

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    for(let i:number = 0; i < 5; i++){
      this.m_queue.push(this.generateShape());
    }
    this.generateComponents();
  }

  public popShape(): Shape{
    var first:Shape | undefined = this.m_queue.pop();
    if(first == undefined){
      throw "Popped on invalid queue state.";
    }

    this.m_queue.unshift(this.generateShape());

    this.generateComponents();
    return first;
  }

  private generateShape(): Shape{
    var key:number = Math.floor(Math.random() * (0 - 7) + 7);
    var values: [string, string] = this.m_shapeConfigs[key];

    return new Shape(values[0], values[1]); 
  }

  private generateComponents(): void{
    // -- Clear the container before adding ShapeComponents.
    this.m_container.clear();

    this.m_queue.forEach(shape => {
      const shapeCompRef = this.m_container.createComponent(ShapeComponent);
      shapeCompRef.setInput("m_shape", shape);
    });
  }

}
