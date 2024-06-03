import { Component, Input, ElementRef, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CharacterAnimationItemComponent } from '../character-animation-item/character-animation-item.component';
var extendedLogging:Boolean = false;
var lastCreatedItem: ComponentRef<CharacterAnimationItemComponent>;
var dismissedItems: Array<ComponentRef<CharacterAnimationItemComponent>> = [];

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
    log("container: ", this.container);

  }
  ngOnChanges(changes:any){
    log("ngOnChange started with changes:", changes);
    if(changes.source.currentValue === ""){
      if(lastCreatedItem)
        lastCreatedItem.setInput("dismissed", true);
    


    }else{
      if(this.container){
        log("trying to create CharacterAnimationItemComponentRef with container: ", this.container);
      }else{
        log("No container found. Cannot create CharacterAnimationItemComponent");
      }
      if(lastCreatedItem){
        //look through dismissed items for ones, marked for destruction
        dismissedItems.forEach((item)=>{
          if(item.instance.markedForDestruction){
            item.destroy();
          }
        })
        //dismiss last created item and add it to the list
        lastCreatedItem.setInput("dismissed", true);
        dismissedItems.push(lastCreatedItem);
      }
      if(this.container){
        //var lastCreatedItemRef:ComponentRef<CharacterAnimationItemComponent> = ;
        lastCreatedItem = this.container.createComponent(CharacterAnimationItemComponent);
        lastCreatedItem.setInput("source", this.source);
        log("lastCreatedItem: ", lastCreatedItem);

      }

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