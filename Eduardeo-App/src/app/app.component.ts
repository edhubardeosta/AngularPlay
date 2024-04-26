import { Component, viewChild, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule, MatFabButton, MatButton} from '@angular/material/button'; 

var progressBarValueInternal:number = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template:  '<button mat-raised-button class="button-rounded mat-raised-button" #startButton>Start!</button>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('startButton', {static: false}) startButton!: MatButton;
  title = 'Eduardeo-App';
  progressBarValue = progressBarValueInternal;
  ngAfterViewInit(){
    main(this);
    this.startButton.disabled = false;
  }
  startButtonClicked() { console.log("StartButton clicked!")}
}
function docReady(fn:any) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}    
function fakeProgressBar(element:any, intervId:any) {
  console.log("fakeProgressBar started.");
  if (!intervId) {
    intervId = setInterval(()=>{console.log("progressBarValue:", element.progressBarValue); element.progressBarValue += 1; if(element.progressBarValue>99){stopProgressBar(intervId)}}, 50);
  }
}
function stopProgressBar(intervId:any) {
  console.log("stopProgressBar started.");
  clearInterval(intervId);
  // release our intervalID from the variable
  intervId = null;
  test2();
}
function main(context:any):void{
  console.log("Doc is ready, Main has started!");
}
function test():void{
  console.log("setting progress bar value to 75");
  progressBarValueInternal=75;
}
function test2():void{
  console.log("setting progress bar value to 25");
  progressBarValueInternal=25;
}
//setTimeout(()=>{console.log("Setting ProgressBar to 75"); progressBarValueInternal=75;}, 5000);

//main();
//console.log("Script started.");
//console.log("Progress Bar Value:", progressBarValueInternal);
