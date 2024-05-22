import { Component, Input , ComponentRef} from '@angular/core';
var extendedLogging = true;

@Component({
  selector: 'app-character-animation-item',
  templateUrl: './character-animation-item.component.html',
  styleUrl: './character-animation-item.component.css'
})
export class CharacterAnimationItemComponent {
  @Input() dismissed: Boolean = false;
  @Input() source: string = "../../assets/Characters/littleGhost.png";
  leaving: Boolean = false;
  characterAnimationItemComponentRef: ComponentRef<CharacterAnimationItemComponent>;
  readyToLeave:Boolean = false;
  constructor(pCharacterAnimationItemComponentRef:ComponentRef<CharacterAnimationItemComponent>){
    this.characterAnimationItemComponentRef = pCharacterAnimationItemComponentRef;
  }
  ngOnChanges(changes:any){
    if(this.dismissed)
      log("dismissed")
  }
  transitionEnd(pEvent:any){
    if(this.leaving){
      //selfdestroy
    }else{
      if(this.dismissed){
        if(this.readyToLeave){
          this.leaving = true;
        }else{
          this.readyToLeave = true;
        }
      }else{
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