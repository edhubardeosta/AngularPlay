import { Component, Input, Output,EventEmitter } from '@angular/core';
import { DialogueItem } from '../game/game.dialogueSystem';

var extendedLogging = true; //set to false later
var responseStage = false;
var answerIsYes = false;

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrl: './dialogue-box.component.css'
})
export class DialogueBoxComponent {
  @Output() yesButtonEvent = new EventEmitter<boolean>();
  @Output() noButtonEvent = new EventEmitter<boolean>();
  @Input() activeItem:DialogueItem|undefined;
  text:string = "";
  yesDeactivated = true;
  noDeactivated = true;
  
  yesTreasureTrend = "/";
  hideYesTreasureTrend = true;
  yesMilitaryTrend = "/";
  hideYesMilitaryTrend = true;
  yesHappinessTrend = "/";
  hideYesHappinessTrend = true;
  yesPopulaceTrend = "/";
  hideYesPopulaceTrend = true;
  
  noTreasureTrend = "/";
  hideNoTreasureTrend = true;
  noMilitaryTrend = "/";
  hideNoMilitaryTrend = true;
  noHappinessTrend = "/";
  hideNoHappinessTrend = true;
  noPopulaceTrend = "/";
  hideNoPopulaceTrend = true;
  
  

  yesButtonClicked(){
    if(responseStage){
      if(answerIsYes){
        this.yesButtonEvent.emit(true);
      }else{
        this.noButtonEvent.emit(false);
      }
      //de-activate the Buttons
      this.noDeactivated = true;
      this.yesDeactivated = true;
      //clear text
      this.text = "";
      //hide resource trends
      this.hideTrends();
    }else{
      answerIsYes = true;
      this.text = this.activeItem!.yesText;
    }
    responseStage = !responseStage;
    

  }
  noButtonClicked(){
    if(responseStage){
      if(answerIsYes){
        this.yesButtonEvent.emit(true);
      }else{
        this.noButtonEvent.emit(false);
      }
      //de-activate the Buttons
      this.noDeactivated = true;
      this.yesDeactivated = true;
      //clear text
      this.text = "";
      //hide resource trends
      this.hideTrends();
    }else{
      answerIsYes = false;
      this.text = this.activeItem!.noText;
    }
    responseStage = !responseStage;
  }

  ngOnChanges(changes:any){
    log("Changes: ",changes);
    if(this.activeItem){
      this.text = this.activeItem.cardText;
      //activate the Buttons
      this.noDeactivated = false;
      this.yesDeactivated = false;
      //display resource trend symbols
      this.displayTrends(this.activeItem);
      
    }else{
      //de-activate the Buttons
      this.noDeactivated = true;
      this.yesDeactivated = true;
    }
  }
  displayTrends(pActiveItem:DialogueItem):void{
    var activeItem:DialogueItem = pActiveItem;
    // display Yes Treasure Trend
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.treasure>0){
      this.yesTreasureTrend = "+";
      this.hideYesTreasureTrend = false;
    }
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.treasure<0){
      this.yesTreasureTrend = "-";
      this.hideYesTreasureTrend = false;
    }
    // display No Treasure Trend
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.treasure>0){
      this.noTreasureTrend = "+";
      this.hideNoTreasureTrend = false;
    }
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.treasure<0){
      this.noTreasureTrend = "-";
      this.hideNoTreasureTrend = false;
    }
    // display Yes Military Trend
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.military>0){
      this.yesMilitaryTrend = "+";
      this.hideYesMilitaryTrend = false;
    }
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.military<0){
      this.yesMilitaryTrend = "-";
      this.hideYesMilitaryTrend = false;
    }
    // display No Military Trend
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.military>0){
      this.noMilitaryTrend = "+";
      this.hideNoMilitaryTrend = false;
    }
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.military<0){
      this.noMilitaryTrend = "-";
      this.hideNoMilitaryTrend = false;
    }
    // display Yes Happiness Trend
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.happiness>0){
      this.yesHappinessTrend = "+";
      this.hideYesHappinessTrend = false;
    }
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.happiness<0){
      this.yesHappinessTrend = "-";
      this.hideYesHappinessTrend = false;
    }
    // display No Happiness Trend
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.happiness>0){
      this.noHappinessTrend = "+";
      this.hideNoHappinessTrend = false;
    }
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.happiness<0){
      this.noHappinessTrend = "-";
      this.hideNoHappinessTrend = false;
    }
    // display Yes Populace Trend
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.populace>0){
      this.yesPopulaceTrend = "+";
      this.hideYesPopulaceTrend = false;
    }
    if(activeItem.yesCostOrProfit && activeItem.yesCostOrProfit.populace<0){
      this.yesPopulaceTrend = "-";
      this.hideYesPopulaceTrend = false;
    }
    // display No Populace Trend
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.populace>0){
      this.noPopulaceTrend = "+";
      this.hideNoPopulaceTrend = false;
    }
    if(activeItem.noCostOrProfit && activeItem.noCostOrProfit.populace<0){
      this.noPopulaceTrend = "-";
      this.hideNoPopulaceTrend = false;
    }
  }

  hideTrends():void{
    //set "yes" trends to neutral
    this.yesTreasureTrend = "/"
    this.yesMilitaryTrend = "/"
    this.yesHappinessTrend = "/"
    this.yesPopulaceTrend = "/"

    //set "no" trends to neutral
    this.noTreasureTrend = "/"
    this.noMilitaryTrend = "/"
    this.noHappinessTrend = "/"
    this.noPopulaceTrend = "/"

    //hide "yes" trends
    this.hideYesTreasureTrend = true;
    this.hideYesMilitaryTrend = true;
    this.hideYesHappinessTrend = true;
    this.hideYesPopulaceTrend = true;

    //hide "no" trends
    this.hideNoTreasureTrend = true;
    this.hideNoMilitaryTrend = true;
    this.hideNoHappinessTrend = true;
    this.hideNoPopulaceTrend = true;
  }

}


function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Dialogue-Box: " + message, input0);
    }else{
      console.log("Dialogue-Box: " + message);
    }
  }
};