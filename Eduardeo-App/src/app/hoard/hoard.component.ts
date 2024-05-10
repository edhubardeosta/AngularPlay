import { Component, ElementRef, ViewContainerRef, ViewChild, ComponentRef, Input, OnChanges } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { HoardItemComponent } from '../hoard-item/hoard-item.component';

var resizeObservable$: Observable<Event>;
var resizeSubscription$: Subscription;
var hoardData: HoardData;
var extendedLogging = true; // set false later

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
    console.log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    console.log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here)
    hoardData = new HoardData(this.container, this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
    resizeObservable$ = fromEvent(window, 'resize')
    resizeSubscription$ = resizeObservable$.subscribe( (evt:any) => {
      hoardData.setDimensions(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight)
      //this.nextElementWidth = new width;
    })
  }
  ngOnDestroy() {
    resizeSubscription$.unsubscribe()
  }
  ngOnChanges(changes:any) {
    console.log("Hoard detected Changes: ",changes);
    if(hoardData)
    hoardData.updateTreasure(this.hoardValue)
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
  rows: Array<Array<HoardDataItem>> = [new Array<HoardDataItem>];
  totalTreasure: number = 0;
  treasureContainer: ViewContainerRef;
  parentWidth: number = 1000;
  parentHeight: number = 1000;
  constructor(pContainer: ViewContainerRef,pParentWidth: number, pParentHeight: number){
    this.treasureContainer = pContainer;
    this.parentWidth = pParentWidth;
    this.parentHeight = pParentHeight;
  }

  updateTreasure(pTotalTreasure:number):void
  {
    log("updateTreasure started with pTotalTreasure: ", pTotalTreasure);
    var difference = pTotalTreasure - this.totalTreasure;
    this.totalTreasure += pTotalTreasure;
    if(this.totalTreasure<6000){
      if(this.totalTreasure<=0){
        this.rows = [new Array<HoardDataItem>];
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
          if(addedValue < 50){
            this.addTreasureItem(10);
            addedValue -= 10;
          }else{
            this.addTreasureItem(50);
            addedValue -= 50;
          }
          
        }
      }

    }

  }

  addTreasureItem(addedValue:number):void{
    log("addTreasureItem started with addedValue: ", addedValue);
    var possibleCoordinates:Array<Array<number>> = [];
    this.rows.forEach((line:Array<HoardDataItem>, lineIndex) => {
      line.forEach((hoardItem:HoardDataItem, itemIndex)=>{
        if(hoardItem.itemValue == 0){
          if(lineIndex == 0 || this.rows[lineIndex-1][itemIndex] && this.rows[lineIndex-1][itemIndex+1]){
            possibleCoordinates.push([itemIndex,lineIndex]);
          }
        }
      })
    });
    if(possibleCoordinates.length == 0){
      var currentRow = 0;
      while(this.rows[currentRow]){
        this.rows[currentRow].push(new HoardDataItem(null, 0));
        currentRow++;
      }
      this.rows.push(new Array<HoardDataItem>);
    }else{
      var chosenCoordinate = possibleCoordinates[getRandomInt(possibleCoordinates.length)];
      switch(addedValue) {
        case 1: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 1);
          //set img to copper coin
          break;
        }
        case 5: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 5);
          //set img to silver coin
          break;
        }
        case 10: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 10);
          //set img to gold coin
          break;
        }
        case 50: {
          this.rows[chosenCoordinate[1]][chosenCoordinate[0]] = new HoardDataItem(this.treasureContainer.createComponent(HoardItemComponent), 50);
          //set img to crystal
          break;
        }
        default:{
          console.error("error! Value for addTreasure must be 1, 5, 10 or 50!")
          break;
        }

      }
      this.fitParent();

    }

  }

  removeTreasure(removedValue:number): void {
    var remainingValue = removedValue;
    //iterating top-to-bottom
    for(var i = this.rows.length-1; i > 0; i--){
      //iterating right-to-left
      for(var j = this.rows[i].length-1; j > 0; j--){
        if(this.rows[i][j].itemValue <= remainingValue){
          remainingValue -= this.rows[i][j].itemValue;
          this.rows[i][j].hoardItemComponentRef?.destroy(); // remove hoardDataItems Component
          this.rows[i][j] = new HoardDataItem(null,0); //assign empty HoardDataItem for removed HoardItem
        }else{
          var difference : number = this.rows[i][j].itemValue - remainingValue;
          remainingValue = 0;
          this.rows[i][j].hoardItemComponentRef?.destroy(); // remove hoardDataItems Component
          this.rows[i][j] = new HoardDataItem(null,0); //assign empty HoardDataItem for removed HoardItem
          this.addValue(difference);
        }

      }
    }
  }

  fitParent():void{
    var itemDistanceHorizontal = this.parentWidth/15;
    var itemDistanceVertical = this.parentHeight/50;
    //If the Hoard is too large, change to dynamic width.
    if(this.rows[0].length>15)
      itemDistanceHorizontal = this.parentWidth/this.rows[0].length;
    this.rows.forEach((line, lineIndex)=>{
      line.forEach((lineItem, itemIndex)=>{
        var offsetHorizontal = itemDistanceHorizontal/2+itemDistanceHorizontal*(lineIndex-1);
        if(lineIndex == 0){
          offsetHorizontal = 0;
        }
        if(lineItem.hoardItemComponentRef){
          lineItem.hoardItemComponentRef.setInput("x", offsetHorizontal+itemDistanceHorizontal*itemIndex);
          lineItem.hoardItemComponentRef.setInput("y", itemDistanceVertical*lineIndex);
        }
      })
    })
}

setDimensions(pWidth:number, pHeight:number):void{
  this.parentWidth = pWidth;
  this.parentHeight = pHeight;
  this.fitParent();
}

}
function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
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