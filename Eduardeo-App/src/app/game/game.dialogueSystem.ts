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
        this.precacheImages();
    }
    public precacheImages(){
        var tempImgs:Array<HTMLImageElement> = [];
        var loaded:Array<string> = [];
        this.allItems.forEach(item => {
            if(!loaded.includes(item.characterSprite)){
                var tempImg:HTMLImageElement = new Image();
                tempImg.src = item.characterSprite;
                tempImgs.push(tempImg);
                loaded.push(item.characterSprite);
            }
        })
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
            var isAlreadyAdded = this.items.find(i => i.stageId == pStageId);
            if(!isAlreadyAdded){
                this.items.push(itemToAdd);
            }else{
                log("Item is already added: ",itemToAdd);
            }
        }else{
            console.error("DialogueItem not found for StageId: ", pStageId);
        }
    }
    public getDialogueItem(pStageId:number):DialogueItem|undefined {
        var itemToGet:DialogueItem|undefined;
        itemToGet = this.allItems.find(i => i.stageId == pStageId);
        if(itemToGet){
            return(itemToGet);
        }else{
            console.error("DialogueItem not found for StageId: ", pStageId);
            return(undefined);
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
    //optional second sprite when leaving
    leavingSprite:string|undefined;
    //which text is displayed
    cardText:string;
    //What stage id will be jumped to on "yes"?
    yesStageIds:Array<number>|undefined;
    //What stage id will be jumped to on "no"?
    noStageIds:Array<number>|undefined;
    //What cost/profit is made on "yes"?
    yesCostOrProfit:CostOrProfitItem;
    //What cost/profit is made on "no"?
    noCostOrProfit:CostOrProfitItem;
    yesText: string;
    noText: string;
    yesConditions: Array<string>;
    noConditions: Array<string>;
    yesRemoveConditions: Array<string>;
    noRemoveConditions: Array<string>;
    activationCondition: StageCondition | undefined;
    deactivationCondition: StageCondition | undefined;
    imgSize: string = "medium";
    hideAnswerResults: boolean = false;
    //What additional conditions are set on "yes"? e.g. buildings built in the background? check if stage is loaded for this.
    //What additional conditions are set on "no"?
    //potential influences, if other stages are loaded?
    hasPrecursor:boolean;
    constructor(pStageId:number,pCharacterSprite:string,pCardText:string,pYesStageIds:Array<number>|undefined = undefined,pNoStageIds:Array<number>|undefined = undefined,pYesCostOrProfit:CostOrProfitItem = new CostOrProfitItem(),pNoCostOrProfit:CostOrProfitItem = new CostOrProfitItem(), pActivationCondition:StageCondition| undefined = undefined, pDeactivationCondition:StageCondition| undefined = undefined, pHasPrecursor = true, pYesText:string,pNoText:string, pYesConditions:Array<string>, pNoConditions:Array<string>,  pYesRemoveConditions:Array<string>, pNoRemoveConditions:Array<string>, pLeavingSprite: string|undefined = undefined, pImgSize:string = "medium", pHideAnwerResults:boolean = false){
        this.stageId = pStageId;
        this.characterSprite = pCharacterSprite;
        this.cardText = pCardText;
        this.yesStageIds = pYesStageIds;
        this.yesStageIds = pNoStageIds;
        this.yesCostOrProfit = pYesCostOrProfit;
        this.noCostOrProfit = pNoCostOrProfit;
        this.hasPrecursor = pHasPrecursor;
        this.yesText = pYesText;
        this.noText = pNoText;
        this.yesConditions = pYesConditions;
        this.noConditions = pNoConditions;
        this.yesRemoveConditions = pYesRemoveConditions;
        this.noRemoveConditions = pNoRemoveConditions;
        this.activationCondition = pActivationCondition;
        this.deactivationCondition = pDeactivationCondition;
        this.leavingSprite = pLeavingSprite;
        this.imgSize = pImgSize;
        this.hideAnswerResults = pHideAnwerResults;
    }
}

export class StageCondition{
    conditions:Array<string>;
    operator:string;
    constructor(pConditions:Array<string>,pOperator:string = "AND"){
        this.conditions = pConditions;
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