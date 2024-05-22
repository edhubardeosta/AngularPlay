import dialogueConfig from './game.dialogueConfig.json'
import { UtilsService } from '../utils.service';
var utils:UtilsService = new UtilsService();
var extendedLogging = false;

export class DialogueData{
    
    items:Array<DialogueItem> = [];
    allItems:Array<DialogueItem> = [];
    lastItem: DialogueItem|undefined = undefined; 
    constructor(){
        this.init();
    }
    init():void{
        log("init started!")
        //load all dialogue items with no precursor stages by id out of a JSON file
        //this.items=dialogueConfig.dialogueItems;
        this.allItems = Object.assign(new Array<DialogueItem>, dialogueConfig);
        log("this.allItems: ", this.allItems);
        //remove items with precursors
        this.items = this.allItems.filter((item:DialogueItem) => !item.hasPrecursor);
    }
    //function to select random dialogue item
    public randomDialogueItem():DialogueItem {
        return(this.items[utils.getRandomInt(this.items.length)]);
    }
    //add dialogue item with specific stage id from JSON file
    public addDialogueItem(pStageId:number) {
        var itemToAdd:DialogueItem|undefined;
        itemToAdd = this.allItems.find(i => i.stageId == pStageId);
        if(itemToAdd){
            this.items.push(itemToAdd);
        }else{
            console.error("DialogueItem not found for StageId: ", pStageId);
        }
        
    }
    //remove dialogue item with specific stage id from "items"
    public removeDialogueItem(pStageId:number) {
        this.items.forEach( (item, index) => {
            if(item.stageId === pStageId) this.items.splice(index,1);
          });
    }

}

export class DialogueItem{
    //what is the stage id
    stageId:number;
    //which character is appearing
    characterSprite:string;
    //which text is displayed
    cardText:string;
    //What stage id will be jumped to on "yes"?
    yesStageId:number|undefined;
    //What stage id will be jumped to on "no"?
    noStageId:number|undefined;
    //What cost/profit is made on "yes"?
    yesCostOrProfit:CostOrProfitItem;
    //What cost/profit is made on "no"?
    noCostOrProfit:CostOrProfitItem;
    yesText: string;
    noText: string;
    //What additional conditions are set on "yes"? e.g. buildings built in the background? check if stage is loaded for this.
    //What additional conditions are set on "no"?
    //potential influences, if other stages are loaded?
    hasPrecursor:boolean;
    passiveAdvancementCondition: StagePassiveAdvancementCondition | undefined;
    constructor(pStageId:number,pCharacterSprite:string,pCardText:string,pYesStageId:number|undefined = undefined,pNoStageId:number|undefined = undefined,pYesCostOrProfit:CostOrProfitItem = new CostOrProfitItem(),pNoCostOrProfit:CostOrProfitItem = new CostOrProfitItem(), pStagePassiveAdvancementCondition:StagePassiveAdvancementCondition| undefined = undefined, pHasPrecursor = true, pYesText:string,pNoText:string){
        this.stageId = pStageId;
        this.characterSprite = pCharacterSprite;
        this.cardText = pCardText;
        this.yesStageId = pYesStageId;
        this.noStageId = pNoStageId;
        this.yesCostOrProfit = pYesCostOrProfit;
        this.noCostOrProfit = pNoCostOrProfit;
        this.passiveAdvancementCondition = pStagePassiveAdvancementCondition;
        this.hasPrecursor = pHasPrecursor;
        this.yesText = pYesText;
        this.noText = pNoText;
    }
}

export class StagePassiveAdvancementCondition{
    newStageId:number;
    conditionStages:Array<number>;
    operator:string;
    constructor(pNewStageId:number,pConditionStages:Array<number>,pOperator:string = "&&"){
        this.newStageId = pNewStageId;
        this.conditionStages = pConditionStages;
        this.operator = pOperator;

    }
}

export class CostOrProfitItem{
    treasure:number;
    military:number;
    happiness:number;
    populace:number;
    constructor(pTreasure:number = 0, pMilitary:number = 0, pHappiness = 0, pPopulace = 0){
        this.treasure = pTreasure;
        this.military = pMilitary;
        this.happiness = pHappiness;
        this.populace = pPopulace;
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