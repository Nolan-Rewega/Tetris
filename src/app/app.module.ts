import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { CtrlPanelComponent } from './components/ctrl-panel/ctrl-panel.component';
import { ShapeComponent } from './components/shape/shape.component';
import { BoardComponent } from './components/board/board.component';
import { QueueComponent } from './components/queue/queue.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    CtrlPanelComponent,
    ShapeComponent,
    BoardComponent,
    QueueComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
