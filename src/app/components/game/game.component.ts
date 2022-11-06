import { Component, OnInit, ViewChild} from '@angular/core';
import { Shape } from "../../Shape";
import { QueueComponent } from '../queue/queue.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild("queue") m_queue !: QueueComponent;

  constructor() { }

  ngOnInit(): void {}


  public requestShape(): Shape{
    return this.m_queue.popShape();
  }

}
