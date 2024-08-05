import { Component, ElementRef, ViewContainerRef, ViewChild, ComponentRef, Input, OnChanges} from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { HoardItemComponent } from '../hoard-item/hoard-item.component';
import { UtilsService } from '../utils.service';

var resizeObservable$: Observable<Event>;
var resizeSubscription$: Subscription;
var hoardData: HoardData;
var extendedLogging = false; // set false later
var sizeSet = false;
var utils:UtilsService = new UtilsService();
var deployedPlatform = "gitHub";

@Component({
  selector: 'app-hoard',
  templateUrl: './hoard.component.html',
  styleUrl: './hoard.component.css'
})
export class HoardComponent implements OnChanges{
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  @Input() hoardValue = 0;
  @Input() extendedLogging = false;
  constructor(private el:ElementRef) { 
  
  }
  ngOnInit(){
    log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here)
    hoardData = new HoardData(this.container, this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
    resizeObservable$ = fromEvent(window, 'resize')
    resizeSubscription$ = resizeObservable$.subscribe( (evt:any) => {
      hoardData.setDimensions(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight)
      if(this.el.nativeElement.offsetWidth != 0 && this.el.nativeElement.offsetHeight != 0){
        sizeSet = true;
      }else{
        false;
      }
    })
  }
  ngOnDestroy() {
    resizeSubscription$.unsubscribe()
  }
  ngOnChanges(changes:any) {
    log("Changes: ",changes);
    if(hoardData)
    hoardData.updateTreasure(this.hoardValue);
    if(!sizeSet){
      if(hoardData)
      hoardData.setDimensions(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
      if(this.el.nativeElement.offsetWidth != 0 && this.el.nativeElement.offsetHeight != 0)
        sizeSet = true;
    }

  }
  precacheImages(){
    //precaching probably not necessary here, I'll do it anyways
    var tempImg1:HTMLImageElement = new Image();
    tempImg1.src = transformImageURL("../../assets/Coppercoin.png");
    var tempImg2:HTMLImageElement = new Image();
    tempImg2.src = transformImageURL("../../assets/Silvercoin.png");
    var tempImg3:HTMLImageElement = new Image();
    tempImg3.src = transformImageURL("../../assets/Goldcoin.png");
    var tempImg4:HTMLImageElement = new Image();
    tempImg4.src = transformImageURL("../../assets/crystal.png");
  }

}

class HoardDataItem{
  hoardItemComponentRef: ComponentRef<HoardItemComponent> | null;
  itemValue: number;
  constructor(pElement: ComponentRef<HoardItemComponent> | null = null, pItemValue: number){
    this.hoardItemComponentRef = pElement;
    this.itemValue = pItemValue;

  }
}
class HoardData {
  rows: Array<Array<HoardDataItem>> = new Array<Array<HoardDataItem>>;
  totalTreasure: number = 0;
  treasureContainer: ViewContainerRef;
  parentWidth: number = 1000;
  parentHeight: number = 1000;
  constructor(pContainer: ViewContainerRef,pParentWidth: number, pParentHeight: number){
    this.treasureContainer = pContainer;
    this.parentWidth = pParentWidth;
    this.parentHeight = pParentHeight;
    this.rows.push(new Array<HoardDataItem>);
  }

  updateTreasure(pTotalTreasure:number):void
  {
    log("updateTreasure started with pTotalTreasure: ", pTotalTreasure);
    var difference = pTotalTreasure - this.totalTreasure;
    log("difference: ", difference);
    this.totalTreasure += difference;
    log("this.totalTreasure: ", this.totalTreasure);
    if(this.totalTreasure<10000){
      if(this.totalTreasure<=0){
        this.treasureContainer.clear()
        this.rows = new Array<Array<HoardDataItem>>;
        this.rows.push(new Array<HoardDataItem>);
      }else{
        if(difference >= 0){
          this.addValue(difference);
          /*
        var test = this.treasureContainer.createComponent(HoardItemComponent);
        test.setInput("x", 500);
        console.log(test.instance.x);*/
        }else{
          this.removeTreasure(difference);
        }
      }
    }
  }
  addValue(pAddedValue:number):void{
    log("addValue started with pAddedValue: ", pAddedValue);
    var addedValue = pAddedValue;
    while(addedValue > 0){
      if(addedValue < 5){
        this.addTreasureItem(1);
        addedValue -= 1;
      }else{
        if(addedValue < 10){
          this.addTreasureItem(5);
          addedValue -= 5;
        }else{
          if(addedValue < 250){
            this.addTreasureItem(10);
            addedValue -= 10;
          }else{
            this.addTreasureItem(250);
            addedValue -= 250;
          }
          
        }
      }

    }

  }

  addTreasureItem(addedValue:number):void{
    log("addTreasureItem started with addedValue: ", addedValue);
    log("and this.rows: ", this.rows);
    var possibleCoordinates:Array<Array<number>> = [];
    var maxzIndex = 0; //used later to correctly position hoard Items in front or behind each other
    this.rows.forEach((line:Array<HoardDataItem>, lineIndex) => {
      log("Checking line for Candidates: ", line);
      line.forEach((hoardItem:HoardDataItem, itemIndex)=>{
        log("Checking if hoardItem is Candidate: ", hoardItem);
        if(hoardItem.itemValue == 0){
          if(lineIndex == 0 || this.rows[lineIndex-1][itemIndex].itemValue>0 && this.rows[lineIndex-1][itemIndex+1].itemValue>0){
            possibleCoordinates.push([itemIndex,lineIndex]);
          }
        }else{
          maxzIndex = lineIndex;
        }
      })
    });
    if(possibleCoordinates.length == 0){
      log("No possible coordinates, possible coordinates.length: ", possibleCoordinates.length);
      var currentRow = 0;
      while(this.rows[currentRow] != undefined){
        this.rows[currentRow].push(new HoardDataItem(null, 0));
        log("Added new HoardDataItem to Row: ", currentRow);
        currentRow++;
      }
      this.rows.push(new Array<HoardDataItem>);
      this.addTreasureItem(addedValue);
    }else{
      log("Possible Coordinates for new Item: ", possibleCoordinates); 
      var chosenCoordinate = possibleCoordinates[utils.getRandomInt(possibleCoordinates.length)];
      switch(addedValue) {
        case 1: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 1);
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]].hoardItemComponentRef!.instance.itemType = "copperCoin";
          //set img to copper coin
          break;
        }
        case 5: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 5);
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]].hoardItemComponentRef!.instance.itemType = "silverCoin";
          //set img to silver coin
          break;
        }
        case 10: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 10);
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]].hoardItemComponentRef!.instance.itemType = "goldCoin";
          //set img to gold coin
          break;
        }
        case 250: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 50);
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]].hoardItemComponentRef!.instance.itemType = "crystal";
          //set img to crystal
          break;
        }
        default:{
          console.error("error! Value for addTreasure must be 1, 5, 10 or 250!")
          break;
        }
      }
      this.rows[chosenCoordinate[1]][chosenCoordinate[0]].hoardItemComponentRef!.instance.zIndex = 100-chosenCoordinate[1];
      this.fitParent();

    }
    log("addTreasureItem finished  with this.rows: ", this.rows);

  }

  removeTreasure(removedValue:number): void {
    log("starting removeTreasure with rows: ", this.rows);
    log("removedValue: ", removedValue);
    var remainingNegative = removedValue;
    //iterating top-to-bottom
    for(var i = this.rows.length-1; i >= 0; i--){
      //iterating right-to-left
      log("row: ", i);
      for(var j = this.rows[i].length-1; j >= 0; j--){
        log("item: ", j);
        if(remainingNegative != 0){
          if(this.rows[i][j].itemValue <= remainingNegative*-1){
            log("removing item: ",this.rows[i][j]);
            remainingNegative += this.rows[i][j].itemValue;
            this.rows[i][j].hoardItemComponentRef?.destroy(); // remove hoardDataItems Component
            this.rows[i][j].hoardItemComponentRef = null;
            this.rows[i][j] = new HoardDataItem(null,0); //assign empty HoardDataItem for removed HoardItem
            log("remainingValue: ",remainingNegative);
          }else{
            log("removing item larger than removedValue: ",this.rows[i][j]);
            var difference : number = this.rows[i][j].itemValue + remainingNegative;
            remainingNegative = 0;
            this.rows[i][j].hoardItemComponentRef?.destroy(); // remove hoardDataItems Component
            this.rows[i][j] = new HoardDataItem(null,0); //assign empty HoardDataItem for removed HoardItem
            log("adding Back difference: ", difference);
            this.addValue(difference);
          }
        }

      }
    }
  }

  fitParent():void{
    var lowestLineDefaultSize = 25;
    var itemDistanceHorizontal = this.parentWidth/lowestLineDefaultSize;
    var itemDistanceVertical = this.parentHeight/50;
    //If the Hoard is too large, change to dynamic width.
    if(this.rows[0].length>lowestLineDefaultSize)
      itemDistanceHorizontal = this.parentWidth/this.rows[0].length;
    this.rows.forEach((line, lineIndex)=>{
      line.forEach((lineItem, itemIndex)=>{
        var offsetHorizontal = itemDistanceHorizontal/2+itemDistanceHorizontal/2*(lineIndex-1);
        if(lineIndex == 0){
          offsetHorizontal = 0;
        }
        if(lineItem.hoardItemComponentRef){
          lineItem.hoardItemComponentRef.setInput("x", offsetHorizontal+itemDistanceHorizontal*itemIndex);
          lineItem.hoardItemComponentRef.setInput("y", this.parentHeight-itemDistanceVertical*lineIndex);
        }
      })
    })
}

setDimensions(pWidth:number, pHeight:number):void{
  log("Setting Hoard dimensions with width:", pWidth);
  log("and height: ", pHeight);
  this.parentWidth = pWidth;
  this.parentHeight = pHeight;
  this.fitParent();
}

}

function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Hoard: " + message, input0);
    }else{
      console.log("Hoard: " + message);
    }
  }
};
function transformImageURL(inputURL:string):string{
  switch(deployedPlatform){
    case "gitHub":
      return inputURL.replace("../../","../CaveQueen/");
    default:
      return inputURL; 
  }
}