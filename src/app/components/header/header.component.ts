import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  score:string = "00000000";
  hiscore:string = "00001234";
  username:string = "Mayhem_john22";

  constructor() { }

  ngOnInit(): void {}
}
