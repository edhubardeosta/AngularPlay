import { Component } from '@angular/core';
import {CostOrProfitItem, DialogueData, DialogueItem} from './game.dialogueSystem'
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
  dialogueItemQueue: Array<number> = [3,29];
  characterQueue: Array<string> = [];
  dayCycle: number = 5;
  dayCounter: number = 0;
  lastPopulace:number = 0;
  lastHoard:number = 0;
  lastMilitary:number = 0;

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
    log(this.dialogueItemQueue);
    log("Dialogue Data Items: ",this.dialogueData.items);
    if(this.dayCounter >= this.dayCycle){
      this.activeDialogueItem = this.getSummaryItem();
      log("activeDialogueItem: ",this.activeDialogueItem);
      this.displayItem = this.activeDialogueItem;
    }else{
      if(this.dialogueItemQueue.length>0){
        var itemId = this.dialogueItemQueue.shift();
        if(itemId != undefined){
          var getItem = this.dialogueData.getDialogueItem(itemId)
          if(getItem){
            this.activeDialogueItem = getItem
            log("activeDialogueItem: ",this.activeDialogueItem);
            this.displayItem = this.activeDialogueItem;
            this.dayCounter++;
          }
        }
      }else{
        var escapeCounter:number = 0;
        do{
          this.activeDialogueItem = this.dialogueData.randomDialogueItem();
          escapeCounter++;
        }while(escapeCounter<10000 && this.characterQueue.includes(this.activeDialogueItem.characterSprite))
        log("escapeCounter: ",escapeCounter);
        log("activeDialogueItem: ",this.activeDialogueItem);
        this.displayItem = this.activeDialogueItem;
        this.dayCounter++;
      }
    }
    if(this.activeDialogueItem?.characterSprite){
      log("ActiveItemHasSprite:", this.activeDialogueItem?.characterSprite);
      this.characterQueue.push(this.activeDialogueItem?.characterSprite);
      log("Queue:", this.characterQueue);
      if(this.characterQueue.length>3){
        this.characterQueue.shift();
        log("Queue Shifted:", this.characterQueue);
      }
    }
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

  getSummaryItem():DialogueItem{
    this.dayCounter = 0;
    var summaryText = "This day of governing is over, my queen. ";
    var popDueHappinessGrowth = Math.floor(this.happinessValue/5);
    var hoardDuePopGrowth = Math.floor(this.populaceValue/10);
    var happinessDueDebtDecline: number;
    if(this.hoardValue>=0)
      happinessDueDebtDecline = 0;
    else
      happinessDueDebtDecline = Math.floor(this.hoardValue/10);
    var popDifference = this.populaceValue + popDueHappinessGrowth - this.lastPopulace;
    var hoardDifference = this.hoardValue + hoardDuePopGrowth - this.lastHoard;
    var militaryDifference = this.militaryValue - this.lastMilitary;
    this.updateGrowthTrackers();
    if(this.populaceValue<=0){
      //game over
    }
    if(happinessDueDebtDecline!=0)
      summaryText += "Sadly, we are in debt, which worries the people. ("+ happinessDueDebtDecline + " happiness) "
    if(this.happinessValue >= 0)
      summaryText += "The people are happy, which made the population grow by an additional " + popDueHappinessGrowth + " people. ";
    else
      summaryText += "The people are unhappy, which made " + -1*popDueHappinessGrowth + " people leave. ";

    if(popDifference>=0)
      summaryText += "In total, the population has grown by " + popDifference + ". ";
    else
      summaryText += "In total, the population has shrunk by " + -1*popDifference + ". ";

    if(hoardDuePopGrowth>=0)
      summaryText += "Our basic tax income is " + hoardDuePopGrowth + ". ";
    if(hoardDifference>=0)
      summaryText += "In total, our treasury grew by " + hoardDifference + ". ";
    else
      summaryText += "In total, our treasury shrunk by " + -1*hoardDifference + ". ";
    if(militaryDifference>=0)
      summaryText += "Lastly, our military grew by " + militaryDifference + ". ";
    else
      summaryText += "Lastly, our military shrunk by " + -1*militaryDifference + ". ";
      

    var summaryItem = new DialogueItem(
      -1,
      "../../assets/Characters/Herald.png",
      summaryText,
      [],
      [],
      new CostOrProfitItem(hoardDuePopGrowth, 0, happinessDueDebtDecline, popDueHappinessGrowth),
      new CostOrProfitItem(hoardDuePopGrowth, 0, happinessDueDebtDecline, popDueHappinessGrowth),
      undefined,
      undefined,
      true,
      "Thank you, my queen.",
      "I can only deliver the truth to you, I cannot change it. I am sorry.",
      [],
      [],
      [],
      []
    )
    return(summaryItem);
  }

  updateGrowthTrackers() {
    this.lastHoard = this.hoardValue;
    this.lastPopulace = this.populaceValue;
    this.lastMilitary = this.militaryValue;
  }

  checkDialogueConditions(){
    //check population
    if(this.populaceValue>150)
      if(!this.activeConditions.includes("popOver150"))
        this.activeConditions.push("popOver150");
    if(this.populaceValue>500)
      if(!this.activeConditions.includes("popOver500"))
        this.activeConditions.push("popOver500");
    if(this.populaceValue>1000)
      if(!this.activeConditions.includes("popOver1000"))
        this.activeConditions.push("popOver1000");
    if(this.populaceValue>2000)
      if(!this.activeConditions.includes("popOver2000"))
        this.activeConditions.push("popOver2000");
    //check hoardValue
    if(this.hoardValue>2000)
      if(!this.activeConditions.includes("hoardOver2000"))
        this.activeConditions.push("hoardOver2000");
    //check military
    if(this.militaryValue>10)
      if(!this.activeConditions.includes("militOver10"))
        this.activeConditions.push("militOver10");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver10")
    //check military
    if(this.militaryValue>100 && !this.activeConditions.includes("militOver100"))
      if(!this.activeConditions.includes("militOver100"))
        this.activeConditions.push("militOver100");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver100")
    
    //check military
    if(this.militaryValue>300)
      if(!this.activeConditions.includes("militOver300"))
        this.activeConditions.push("militOver300");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver300")
    //check military
    if(this.militaryValue>500)
      if(!this.activeConditions.includes("militOver500"))
        this.activeConditions.push("militOver500");
    else
      this.activeConditions = this.activeConditions.filter((condition:string) => condition != "militOver500")
    //check happiness
    if(this.happinessValue>50)
      if(!this.activeConditions.includes("happinessOver50"))
        this.activeConditions.push("happinessOver50");
    if(this.happinessValue<-50)
      if(!this.activeConditions.includes("happinessUnder-50"))
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
            log("identified as \"OR\" Condition.")
            var match = false;
            item.deactivationCondition.conditions.forEach(condition => {
              this.activeConditions.forEach(activeCondition => {
                if(condition == activeCondition){
                  log("Match found with: ", activeCondition);
                  match = true;
                }
              })
            })
            if(match != false){
              log("Setting deactivated = true.")
              deactivated = true;
            }
            break;
          case "XOR":
            log("identified as \"XOR\" Condition.")
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
            log("Using default \"AND\" Condition.")
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
      log("deactivated: ", deactivated);
      var itemIsActive = !deactivated;
      log("returning itemIsActive: ", itemIsActive);
      return itemIsActive;
    })
    log("After removing: dialogueData.items:", this.dialogueData.items);

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
