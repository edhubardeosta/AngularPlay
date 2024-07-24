import { Component } from '@angular/core';
import {DialogueData, DialogueItem} from './game.dialogueSystem'
var extendedLogging = true;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  displayItem: DialogueItem|undefined = undefined;
  hoardValue = 0;
  militaryValue = 0;
  happinessValue = 0;
  populaceValue = 0;
  displaySubMenu = true;
  activeDialogueItem:DialogueItem|undefined;
  dialogueData:DialogueData = new DialogueData();
  activeConditions: Array<string> = [];

  menuButtonClicked(){
    console.log("menuButtonClicked.");
    this.displaySubMenu = !this.displaySubMenu;
  }
  addMoney(){
    this.hoardValue += 1000;
  }
  addPopulace(){
    this.populaceValue += 1000;
  }
  removeMoney(){
    this.hoardValue -= 49;
  }
  startDialogue(){
    log("Dialogue Data Items: ",this.dialogueData.items);
    var lastSprite = this.activeDialogueItem?.characterSprite;
    this.activeDialogueItem = this.dialogueData.randomDialogueItem();
    var escapeCounter:number = 0;
    while(escapeCounter<10 && lastSprite == this.activeDialogueItem.characterSprite){
      this.activeDialogueItem = this.dialogueData.randomDialogueItem();
    }
    log("activeDialogueItem: ",this.activeDialogueItem);
    this.displayItem = this.activeDialogueItem;
  }
  dialogueYes($event:any){
    if(this.activeDialogueItem){
      this.displayItem = undefined;
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      if(this.activeDialogueItem.yesCostOrProfit?.treasure)
      this.hoardValue += this.activeDialogueItem.yesCostOrProfit.treasure;
      if(this.activeDialogueItem.yesCostOrProfit?.military)
      this.militaryValue += this.activeDialogueItem.yesCostOrProfit.military;
      if(this.activeDialogueItem.yesCostOrProfit?.happiness)
      this.happinessValue += this.activeDialogueItem.yesCostOrProfit.happiness;
      if(this.activeDialogueItem.yesCostOrProfit?.populace)
      this.populaceValue += this.activeDialogueItem.yesCostOrProfit.populace;
      if(this.activeDialogueItem.yesStageIds && this.activeDialogueItem.yesStageIds?.length!>0){
        this.activeDialogueItem.yesStageIds.forEach( stageId => {
          this.dialogueData.addDialogueItem(stageId);
        })
      }
      if(this.activeDialogueItem.yesConditions && this.activeDialogueItem.yesConditions?.length!>0){
        this.activeDialogueItem.yesConditions.forEach( yesCondition => {
          this.activeConditions.push(yesCondition);
        })
      }
      if(this.activeDialogueItem.yesRemoveConditions && this.activeDialogueItem.yesRemoveConditions?.length!>0){
        this.activeConditions = this.activeConditions.filter((element) => !this.activeDialogueItem!.yesRemoveConditions.includes(element))
      }

      this.activeDialogueItem = undefined;
      this.checkDialogueConditions();
      log("DialogueYes hoardValue:", this.hoardValue);
      log("DialogueYes militaryValue:", this.militaryValue);
      log("DialogueYes happinessValue:", this.happinessValue);
      log("DialogueYes populaceValue:", this.populaceValue);
    }
  }
  dialogueNo($event:any){
    if(this.activeDialogueItem){
      this.displayItem = undefined;
      this.dialogueData.removeDialogueItem(this.activeDialogueItem.stageId);
      if(this.activeDialogueItem.noCostOrProfit?.treasure)
      this.hoardValue += this.activeDialogueItem.noCostOrProfit.treasure;
      if(this.activeDialogueItem.noCostOrProfit?.military)
      this.militaryValue += this.activeDialogueItem.noCostOrProfit.military;
      if(this.activeDialogueItem.noCostOrProfit?.happiness)
      this.happinessValue += this.activeDialogueItem.noCostOrProfit.happiness;
      if(this.activeDialogueItem.noCostOrProfit?.populace)
      this.populaceValue += this.activeDialogueItem.noCostOrProfit.populace;
      if(this.activeDialogueItem.noStageIds && this.activeDialogueItem.noStageIds?.length!>0){
        this.activeDialogueItem.noStageIds.forEach( stageId => {
          this.dialogueData.addDialogueItem(stageId);
        })
      }
      if(this.activeDialogueItem.noConditions && this.activeDialogueItem.noConditions?.length!>0){
        this.activeDialogueItem.noConditions.forEach( noCondition => {
          this.activeConditions.push(noCondition);
        })
      }
      if(this.activeDialogueItem.noRemoveConditions && this.activeDialogueItem.noRemoveConditions?.length!>0){
        this.activeConditions = this.activeConditions.filter((element) => !this.activeDialogueItem!.noRemoveConditions.includes(element))
      }

      this.activeDialogueItem = undefined;
      this.checkDialogueConditions();
      log("DialogueNo hoardValue:", this.hoardValue);
      log("DialogueNo militaryValue:", this.militaryValue);
      log("DialogueNo happinessValue:", this.happinessValue);
      log("DialogueNo populaceValue:", this.populaceValue);
      
    }
    
  }
  checkDialogueConditions(){
    //check population
    if(this.populaceValue>150)
      this.activeConditions.push("popOver150");
    if(this.populaceValue>500)
      this.activeConditions.push("popOver500");
    if(this.populaceValue>1000)
      this.activeConditions.push("popOver1000");
    if(this.populaceValue>2000)
      this.activeConditions.push("popOver2000");
    //check hoardValue
    if(this.hoardValue>2000)
      this.activeConditions.push("hoardOver2000");
    //check military
    if(this.militaryValue>10)
      this.activeConditions.push("militOver10");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver10")
    //check military
    if(this.militaryValue>100)
      this.activeConditions.push("militOver100");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver100")
    
    //check military
    if(this.militaryValue>300)
      this.activeConditions.push("militOver300");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver300")
    //check military
    if(this.militaryValue>500)
      this.activeConditions.push("militOver500");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver500")
    //check happiness
    if(this.happinessValue>50)
      this.activeConditions.push("happinessOver50");
    if(this.happinessValue<-50)
      this.activeConditions.push("happinessUnder-50");

    this.dialogueData.allItems.forEach(item => {
      //check for deactivation condition
      var deactivate = true;
      if(item.deactivationCondition){
        switch(item.deactivationCondition.operator){
          
          case "OR":
            var match = false;
            item.deactivationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  match = true;
              })
            })
            if(match == false)
              deactivate = false;
            break;
          case "XOR":
            var match = false;
            item.deactivationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  if(match == false){
                    match = true;
                  }else{
                    deactivate = false;
                  }
              })
            })
            if(match == false)
              deactivate = false;
            break;
          default:
            item.deactivationCondition.conditions.forEach(condition => {
              var match = false;
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  match = true;
              })
              if(match == false)
                deactivate = false;
            })
            break;
        }

      }else{
        deactivate = false;
      }
      //add dialogueItems with fulfilled activationConditions
      if(item.activationCondition && !deactivate){
        var falseConditionFound = false;
        switch(item.activationCondition.operator){
          case "OR":
            var match = false;
            item.activationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  match = true;
              })
            })
            if(match == false)
              falseConditionFound = true;
            break;
          case "XOR":
            var match = false;
            item.activationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  if(match == false){
                    match = true;
                  }else{
                    falseConditionFound = true;
                  }
              })
            })
            if(match == false)
              falseConditionFound = true;
            break;
          default:
            item.activationCondition.conditions.forEach(condition => {
              var match = false;
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  match = true;
              })
              if(match == false)
                falseConditionFound = true;
            })
            break;
        }
        if(!falseConditionFound){
          log("Conditions are met for dialogue item, adding: ", item);
          this.dialogueData.addDialogueItem(item.stageId);
        }
      }

    });
    //remove deactivated items from active items
    log("Checking deactivations conditions with current active conditions: ", this.activeConditions);
    log("On dialogueData.items:", this.dialogueData.items);
    this.dialogueData.items = this.dialogueData.items.filter((item) => {
      var deactivated = false;
      if(item.deactivationCondition){
        log("deactivationCondition found: ", item.deactivationCondition)
        switch(item.deactivationCondition.operator){
          case "OR":
            var match = false;
            item.deactivationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  log("Match found with: ", activeCondition);
                  match = true;
              })
            })
            if(match != false)
              deactivated = true;
            break;
          case "XOR":
            var match = false;
            item.deactivationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  if(match == false){
                    match = true;
                  }else{
                    deactivated = true;
                  }
              })
            })
            if(match == false)
              deactivated = true;
            break;
          default:
            item.deactivationCondition.conditions.forEach(condition => {
              var match = false;
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition)
                  match = true;
              })
              if(match == false)
                deactivated = true;
            })
            break;
        }

      }
      var itemIsActive = !deactivated;
      log("returning: ", itemIsActive);
      return itemIsActive;
    })

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
