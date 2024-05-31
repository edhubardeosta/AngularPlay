import { Component } from '@angular/core';
import {DialogueData, DialogueItem} from './game.dialogueSystem'
var extendedLogging = true;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  currentSubjectImg = "";
  hoardValue = 10000;
  militaryValue = 10000;
  happinessValue = 100;
  populaceValue = 100000;
  displaySubMenu = true;
  activeDialogueItem:DialogueItem|undefined;
  dialogueData:DialogueData = new DialogueData();

  menuButtonClicked(){
    console.log("menuButtonClicked.");
    this.displaySubMenu = !this.displaySubMenu;
  }
  addMoney(){
    this.hoardValue += 1000;
  }
  removeMoney(){
    this.hoardValue -= 49;
  }
  startDialogue(){
    log("Dialogue Data Items: ",this.dialogueData.items);
    this.activeDialogueItem = this.dialogueData.randomDialogueItem();
    log("activeDialogueItem: ",this.activeDialogueItem);
    this.currentSubjectImg = this.activeDialogueItem.characterSprite;
  }
  spawnSubject(){
    log("spawnSubject started.");
    this.currentSubjectImg = "../../assets/Characters/littleGhost.png";
  }
  dismissSubject(){
    log("dismissSubject started.");
    this.currentSubjectImg = "";
  }
  dialogueYes($event:any){
    if(this.activeDialogueItem){
      this.currentSubjectImg = "";
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      this.hoardValue += this.activeDialogueItem.yesCostOrProfit.treasure;
      this.militaryValue += this.activeDialogueItem.yesCostOrProfit.military;
      this.happinessValue += this.activeDialogueItem.yesCostOrProfit.happiness;
      this.populaceValue += this.activeDialogueItem.yesCostOrProfit.populace;
      if(this.activeDialogueItem.yesStageId)
      this.dialogueData.addDialogueItem(this.activeDialogueItem.yesStageId);
      this.activeDialogueItem = undefined;
      log("DialogueYes hoardValue:", this.hoardValue);
      log("DialogueYes militaryValue:", this.militaryValue);
      log("DialogueYes happinessValue:", this.happinessValue);
      log("DialogueYes populaceValue:", this.populaceValue);
    }
  }
  dialogueNo($event:any){
    if(this.activeDialogueItem){
      this.currentSubjectImg = "";
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      this.hoardValue += this.activeDialogueItem.noCostOrProfit.treasure;
      this.militaryValue += this.activeDialogueItem.noCostOrProfit.military;
      this.happinessValue += this.activeDialogueItem.noCostOrProfit.happiness;
      this.populaceValue += this.activeDialogueItem.noCostOrProfit.populace;
      if(this.activeDialogueItem.noStageId)
      this.dialogueData.addDialogueItem(this.activeDialogueItem.noStageId);
      this.activeDialogueItem = undefined;
      log("DialogueNo hoardValue:", this.hoardValue);
      log("DialogueNo militaryValue:", this.militaryValue);
      log("DialogueNo happinessValue:", this.happinessValue);
      log("DialogueNo populaceValue:", this.populaceValue);
      
    }
    
  }

}
function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Game: " + message, input0);
    }else{
      console.log("Game: " + message);
    }
  }
};
