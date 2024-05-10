import { Component, ElementRef, ViewChild} from '@angular/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule, MatFabButton, MatButton} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 

var progressBarValueInternal:number;
var loadScreenClassesInternal:Array<string> = ["hidden"];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template:  '',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadScreenHidden = true;
  gameHidden = true;
  title = 'Eduardeo-App';
  progressBarValue = progressBarValueInternal;
  loadScreenClasses = loadScreenClassesInternal;
  hoardValueTemp = 0; //remove this later
  start($event:any){
    this.loadScreenHidden = false; 
    this.progressBarValue = 100;
  }
  loaded($event:any){
    this.loadScreenHidden = true; 
    this.gameHidden = false;
  }
  add50Temp($event:any){
    console.log("add50Temp run.")
    this.hoardValueTemp += 50;
  }
}
function main(context:any):void{
  console.log("Main has started! Context: ", context);
  context.loadScreenHidden = true;
  context.gameHidden = false;
}
function test():void{
  console.log("setting progress bar value to 75");
  progressBarValueInternal=75;
}
function test2():void{
  console.log("setting progress bar value to 25");
  progressBarValueInternal=25;
}
