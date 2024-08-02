import { Component } from '@angular/core';

var progressBarValueInternal:number;
var loadScreenClassesInternal:Array<string> = ["hidden"];
var extendedLogging:boolean = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template:  '',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadScreenHidden = true;
  gameHidden = true;
  endScreenHidden = true;
  title = 'Eduardeo-App';
  endScreenEvent = "";
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
  gameOver($event:any){ 
    log("Game Over")
    this.gameHidden = true;
    this.endScreenHidden = false;
    this.endScreenEvent = "gameOver";
  }
  gameWon($event:any){
    log("Game Won")
    this.gameHidden = true;
    this.endScreenHidden = false;
    this.endScreenEvent = "gameWon";
  }
}
function main(context:any):void{
  console.log("Main has started! Context: ", context);
  context.loadScreenHidden = true;
  context.gameHidden = false;
  context.endScreenHidden = true;
}

function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("App: " + message, input0);
    }else{
      console.log("App: " + message);
    }
  }
};
