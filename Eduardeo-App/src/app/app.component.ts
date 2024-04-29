import { Component, ElementRef, ViewChild} from '@angular/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule, MatFabButton, MatButton} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 

var progressBarValueInternal:number = 0;
var loadScreenClassesInternal:Array<string> = ["hidden"];
var intervId:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template:  '<button mat-raised-button class="button-rounded mat-raised-button" #startButton>Start!</button>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  startMenuHidden = false;
  loadScreenHidden = true;
  @ViewChild('startButton', {static: false}) startButton!: MatButton;
  @ViewChild('startHeader', {static: false}) startHeader!: ElementRef;
  @ViewChild('startDescription', {static: false}) startDescription!: ElementRef;
  @ViewChild('loadingProgressBar', {static: false}) loadingProgressBar!: MatProgressBar;
  title = 'Eduardeo-App';
  progressBarValue = progressBarValueInternal;
  loadScreenClasses = loadScreenClassesInternal;
  ngAfterViewInit(){
    this.startButton.disabled = false;
  }
  startButtonClicked() {this.startMenuHidden = true; this.loadScreenHidden = false; console.log("StartButton clicked! New startMenuHidden: ", this.startMenuHidden); fakeProgressBar(this, intervId, main, [this])}
}
function hide(element:any){
  
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
function fakeProgressBar(context:any, intervId:any, callback: Function, callbackArgs: Array<any>) {
  console.log("fakeProgressBar started.");
  if (!intervId) {
    intervId = setInterval(()=>{console.log("progressBarValue:", context.progressBarValue); context.progressBarValue += 1; if(context.progressBarValue>99){stopProgressBar(intervId,callback, callbackArgs)}}, 50);
  }
}
function stopProgressBar(intervId:any, callback: Function, args: Array<any>) {
  console.log("stopProgressBar started. Args:", args);
  clearInterval(intervId);
  // release our intervalID from the variable
  intervId = null;
  callback.apply(null, args);
}
function main(context:any):void{
  console.log("Main has started! Context: ", context);
  context.loadScreenHidden = true;
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
