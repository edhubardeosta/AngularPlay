import { Component } from '@angular/core';

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
  gameHidden = false;
  title = 'Eduardeo-App';
  progressBarValue = progressBarValueInternal;
  loadScreenClasses = loadScreenClassesInternal;
  start($event:any){
    this.loadScreenHidden = false; 
    this.progressBarValue = 100;
  }
  loaded($event:any){
    this.loadScreenHidden = true; 
    this.gameHidden = false;
  }
}
function main(context:any):void{
  console.log("Main has started! Context: ", context);
  context.loadScreenHidden = true;
  context.gameHidden = false;
}
