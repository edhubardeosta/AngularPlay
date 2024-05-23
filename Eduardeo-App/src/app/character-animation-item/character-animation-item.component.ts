import { Component, Input } from '@angular/core';
var extendedLogging = true;

@Component({
  selector: 'app-character-animation-item',
  templateUrl: './character-animation-item.component.html',
  styleUrl: './character-animation-item.component.css'
})
export class CharacterAnimationItemComponent {
  @Input() dismissed: Boolean = false;
  @Input() source: string = "";
  leaving: boolean = false;
  readyToLeave:Boolean = false;
  markedForDestruction = false;
  hidden = false;
  constructor(){
    
  }
  ngOnChanges(changes:any){
    log("ngOnChanges started with changes: ", changes);
    if(this.dismissed){
      log("dismissed is true");
      if(this.readyToLeave){
        this.leaving = true;
        log("setting this.leaving to: ", this.leaving);
      }
    }
  }
  animationEnd(pEvent:any){
    log("transitionEnd started with pEvent: ", pEvent);
    if(this.leaving){
      //hide and mark for destruction by the container
      this.hidden = true;
      this.markedForDestruction = true;
    }else{
      if(this.dismissed){
        //leave
        this.leaving = true;
      }else{
        //leave when dismissed
        this.readyToLeave = true;
      }
    }
  }
}


function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Character-Animation-Item: " + message, input0);
    }else{
      console.log("Character-Animation-Item: " + message);
    }
  }
};