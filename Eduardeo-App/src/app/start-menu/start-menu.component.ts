import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatButtonModule, MatFabButton, MatButton} from '@angular/material/button'; 


@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.css'
})
export class StartMenuComponent {
  startMenuHidden = false;
  fadeOut = false;

  @Output() startButtonEvent = new EventEmitter<boolean>();

  @ViewChild('startButton', {static: false}) startButton!: MatButton;
  @ViewChild('startHeader', {static: false}) startHeader!: ElementRef;
  @ViewChild('startDescription', {static: false}) startDescription!: ElementRef;
  @ViewChild('startDiv', {static: false}) startDiv!: ElementRef;
  addStartButtonEvent(){
    this.startButtonEvent.emit(true);
  };
  ngAfterViewInit(){
    this.startButton.disabled = false;
  }
  startButtonClicked() {this.startButton.disabled = true;  console.log("StartButton clicked!"); this.fadeOut = true};
  animationFinished() {this.startMenuHidden = true; this.addStartButtonEvent()}
}
