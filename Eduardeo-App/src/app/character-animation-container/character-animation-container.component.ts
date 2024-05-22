import { Component, Input, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CharacterAnimationItemComponent } from '../character-animation-item/character-animation-item.component';
var extendedLogging:Boolean = true;
var lastCreatedItem: CharacterAnimationItemComponent;

@Component({
  selector: 'app-character-animation-container',
  templateUrl: './character-animation-container.component.html',
  styleUrl: './character-animation-container.component.css'
})
export class CharacterAnimationContainerComponent {
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  @Input() source:String = "";
  constructor(private el:ElementRef) { 
  
  }
  ngOnInit(){
    log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here)

  }
  ngOnChange(changes:any){
    if(changes.source === ""){
      if(lastCreatedItem)
        lastCreatedItem.dismissed = true;


    }else{
      lastCreatedItem = new CharacterAnimationItemComponent(this.container.createComponent(CharacterAnimationItemComponent));

    }
  }

}

function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Character-Animation-Container: " + message, input0);
    }else{
      console.log("Character-Animation-Container: " + message);
    }
  }
};