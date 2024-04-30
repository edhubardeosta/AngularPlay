import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatButtonModule, MatFabButton, MatButton} from '@angular/material/button'; 


@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.css'
})
export class StartMenuComponent {
  startMenuHidden = false;

  @Output() startButtonEvent = new EventEmitter<boolean>();

  @ViewChild('startButton', {static: false}) startButton!: MatButton;
  @ViewChild('startHeader', {static: false}) startHeader!: ElementRef;
  @ViewChild('startDescription', {static: false}) startDescription!: ElementRef;
  addStartButtonEvent(){
    this.startButtonEvent.emit(true);
  };
  ngAfterViewInit(){
    this.startButton.disabled = false;
  }
  startButtonClicked() {this.startMenuHidden = true; console.log("StartButton clicked! New startMenuHidden: ", this.startMenuHidden);this.addStartButtonEvent()};
}
