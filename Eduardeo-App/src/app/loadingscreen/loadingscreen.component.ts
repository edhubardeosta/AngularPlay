import { Component, ViewChild, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 

var extendedLogging = false;
var loadIntervId:any;
@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrl: './loadingscreen.component.css'
})
export class LoadingscreenComponent implements OnChanges {
fadeOut = false;
progressBarValue = 0;
  @Input() progressBarValueInternal = 0;
  @Input() loadScreenHidden = true;

  @Output() finishedLoading = new EventEmitter<number>();

  @ViewChild('loadingProgressBar', {static: false}) loadingProgressBar!: MatProgressBar;

  ngOnChanges(changes:any){
    log("Change detected:", changes);
    if(changes.progressBarValueInternal?.currentValue != changes.progressBarValueInternal?.previousValue){
      log("Change on progressBarValueInternal detected!");
      loadUpTo(this.progressBarValueInternal, this, loadIntervId, ()=>{this.fadeOut = true;}, []);
    }
  }
  animationFinished() {this.loadScreenHidden = true; this.finishedLoading.emit(this.progressBarValueInternal);}

}
function loadUpTo(targetValue:number, context:any, intervId:any, callback: Function, callbackArgs: Array<any>) {
  console.log("fakeProgressBar started.");
  if (!intervId) {
    intervId = setInterval(()=>{console.log("progressBarValue:", context.progressBarValue); context.progressBarValue += 1; if(context.progressBarValue>targetValue-1){stopProgressBar(intervId,callback, callbackArgs)}}, 2);
  }
}
function stopProgressBar(intervId:any, callback: Function, args: Array<any> = []){
  console.log("stopProgressBar started. Args:", args);
  clearInterval(intervId);
  // release our intervalID from the variable
  intervId = null;
  callback.apply(null, args);
}
function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Loading-Screen: " + message, input0);
    }else{
      console.log("Loading-Screen: " + message);
    }
  }
};