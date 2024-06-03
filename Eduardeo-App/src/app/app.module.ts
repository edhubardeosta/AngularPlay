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
import { DialogueBoxComponent } from './dialogue-box/dialogue-box.component';
import { CharacterAnimationContainerComponent } from './character-animation-container/character-animation-container.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ResourceCounterComponent } from './resource-counter/resource-counter.component';  
import {MatTableModule} from '@angular/material/table';
import { CharacterAnimationItemComponent } from './character-animation-item/character-animation-item.component';
import { CityContainerComponent } from './city-container/city-container.component';
import { CityBuildingContainerComponent } from './city-building-container/city-building-container.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    LoadingscreenComponent,
    GameComponent,
    HoardComponent,
    HoardItemComponent,
    DialogueBoxComponent,
    CharacterAnimationContainerComponent,
    ResourceCounterComponent,
    CharacterAnimationItemComponent,
    CityContainerComponent,
    CityBuildingContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
