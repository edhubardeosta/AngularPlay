import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { LoadingscreenComponent } from './loadingscreen/loadingscreen.component';
import { GameComponent } from './game/game.component';
import { HoardComponent } from './hoard/hoard.component';
import { HoardItemComponent } from './hoard-item/hoard-item.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    LoadingscreenComponent,
    GameComponent,
    HoardComponent,
    HoardItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
