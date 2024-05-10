import { Component, ElementRef, ViewContainerRef, ViewChild, viewChild, ComponentRef } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { HoardItemComponent } from '../hoard-item/hoard-item.component';

var resizeObservable$: Observable<Event>;
var resizeSubscription$: Subscription;
var hoardData: HoardData;

@Component({
  selector: 'app-hoard',
  templateUrl: './hoard.component.html',
  styleUrl: './hoard.component.css'
})
export class HoardComponent {
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
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

  updateTreasure(addedTreasure:number):void
  {
    this.totalTreasure += addedTreasure;
    if(this.totalTreasure<6000){
      if(this.totalTreasure<=0){
        this.rows = [new Array<HoardDataItem>];
      }else{
        if(addedTreasure >= 0){
          while(addedTreasure > 0){
            if(addedTreasure < 5){
              this.addTreasure(1);
              addedTreasure -= 1;
            }else{
              if(addedTreasure < 10){
                this.addTreasure(5);
                addedTreasure -= 5;
              }else{
                if(addedTreasure < 50){
                  this.addTreasure(10);
                  addedTreasure -= 10;
                }else{
                  this.addTreasure(50);
                  addedTreasure -= 50;
                }
                
              }
            }

          }
          /*
        var test = this.treasureContainer.createComponent(HoardItemComponent);
        test.setInput("x", 500);
        console.log(test.instance.x);*/
        }else{
          //removeTreasure
        }
      }
    }
  }

  addTreasure(addedValue:number):void{
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
      do{
        this.rows[currentRow].push(new HoardDataItem(null, 0));
        currentRow++;
      }while(this.rows[currentRow].length < 1);
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

    }

  }

  rebalance():void{
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
  this.rebalance();
}

}
function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}