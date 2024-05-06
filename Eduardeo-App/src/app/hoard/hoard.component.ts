import { Component, ElementRef, ViewContainerRef, ViewChild, viewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { HoardItemComponent } from '../hoard-item/hoard-item.component';

var nextElementHeightInternal:number;
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
  nextElementHeight:any;
  nextElementWidth:any;
  ngOnInit(){
    nextElementHeightInternal = this.el.nativeElement.offsetHeight - this.el.nativeElement.offsetHeight*0.05;
    this.nextElementHeight = nextElementHeightInternal;
    console.log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    console.log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here)
    resizeObservable$ = fromEvent(window, 'resize')
    resizeSubscription$ = resizeObservable$.subscribe( (evt:any) => {
      this.nextElementHeight = this.el.nativeElement.offsetHeight - this.el.nativeElement.offsetHeight*0.05;
      //this.nextElementWidth = new width;
      hoardData = new HoardData(this.container);
    })
  }
  ngOnDestroy() {
    resizeSubscription$.unsubscribe()
  }

}

class HoardItem{
  imgItem: ElementRef;
  itemValue: number;
  constructor(pElement: ElementRef, pItemValue: number){
    this.imgItem = pElement;
    this.itemValue = pItemValue;

  }
}
class HoardData {
  rows: Array<Array<any>> = [];
  totalTreasure: number = 0;
  treasureContainer: ViewContainerRef;
  constructor(pContainer: ViewContainerRef){
    this.treasureContainer = pContainer;
  }

  updateTreasure(addedTreasure:number):void
  {
    this.totalTreasure += addedTreasure;
    if(this.totalTreasure<=0){
      //clear Hoard
    }
    if(addedTreasure >= 0){
      //addTreasure
    var test = this.treasureContainer.createComponent(HoardItemComponent);
    test.setInput("x", 500);
    console.log(test.instance.x);
    }else{
      //removeTreasure
    }

  }





}