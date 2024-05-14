import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  hoardValue = 0;
  displaySubMenu = true;

  menuButtonClicked(){
    console.log("menuButtonClicked.");
    this.displaySubMenu = !this.displaySubMenu;
  }
  addMoney(){
    this.hoardValue += 499;
  }
  removeMoney(){
    this.hoardValue -= 499;
  }

}
