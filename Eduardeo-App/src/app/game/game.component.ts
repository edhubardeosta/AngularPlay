import { Component } from '@angular/core';
import {DialogueData, DialogueItem} from './game.dialogueSystem'
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  hoardValue = 0;
  displaySubMenu = true;
  activeDialogueItem:DialogueItem|undefined;
  dialogueData:DialogueData = new DialogueData();

  menuButtonClicked(){
    console.log("menuButtonClicked.");
    this.displaySubMenu = !this.displaySubMenu;
  }
  addMoney(){
    this.hoardValue += 49;
  }
  removeMoney(){
    this.hoardValue -= 49;
  }
  startDialogue(){
    console.log("Dialogue Data Items: ",this.dialogueData.items);
    this.activeDialogueItem = this.dialogueData.randomDialogueItem();
    console.log("activeDialogueItem: ",this.activeDialogueItem);

  }
  dialogueYes($event:any){
    if(this.activeDialogueItem){
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      this.hoardValue += this.activeDialogueItem.yesCostOrProfit.treasure;
      if(this.activeDialogueItem.yesStageId)
      this.dialogueData.addDialogueItem(this.activeDialogueItem.yesStageId);
      this.activeDialogueItem = undefined;
    }
  }
  dialogueNo($event:any){
    if(this.activeDialogueItem){
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      this.hoardValue += this.activeDialogueItem.noCostOrProfit.treasure;
      if(this.activeDialogueItem.noStageId)
      this.dialogueData.addDialogueItem(this.activeDialogueItem.noStageId);
      this.activeDialogueItem = undefined;
      
    }
    
  }

}
