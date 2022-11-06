import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ctrl-panel',
  templateUrl: './ctrl-panel.component.html',
  styleUrls: ['./ctrl-panel.component.css']
})
export class CtrlPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  moveLeft(): void {}
  moveDown(): void {}
  moveRight(): void {}
  rotateCCW(): void {}
  rotateCW(): void {}

}
