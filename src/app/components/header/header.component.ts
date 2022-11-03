import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  score:string = "000000";
  hiscore:string = "000123";
  username:string = "Johndoe23";

  constructor() { }

  ngOnInit(): void {}
}
