import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrl: './dialogue-box.component.css'
})
export class DialogueBoxComponent {
  @Output() startButtonEvent = new EventEmitter<boolean>();
  yesButtonClicked(){

  }
  noButtonClicked(){
    
  }

}
