import { Component, ViewChild, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 

var loadIntervId:any;
@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrl: './loadingscreen.component.css'
})
export class LoadingscreenComponent implements OnChanges {
progressBarValue = 0;
  @Input() progressBarValueInternal = 0;
  @Input() loadScreenHidden = true;

  @Output() finishedLoading = new EventEmitter<number>();

  @ViewChild('loadingProgressBar', {static: false}) loadingProgressBar!: MatProgressBar;

  ngOnChanges(changes:any){
    console.log("Change on Loadingscreen detected:", changes);
    if(changes.progressBarValueInternal?.currentValue != changes.progressBarValueInternal?.previousValue){
      console.log("Change on progressBarValueInternal detected!");
      loadUpTo(this.progressBarValueInternal, this, loadIntervId, ()=>{this.finishedLoading.emit(this.progressBarValueInternal);}, []);
    }
  }

}
function loadUpTo(targetValue:number, context:any, intervId:any, callback: Function, callbackArgs: Array<any>) {
  console.log("fakeProgressBar started.");
  if (!intervId) {
    intervId = setInterval(()=>{console.log("progressBarValue:", context.progressBarValue); context.progressBarValue += 1; if(context.progressBarValue>targetValue-1){stopProgressBar(intervId,callback, callbackArgs)}}, 50);
  }
}
function stopProgressBar(intervId:any, callback: Function, args: Array<any> = []){
  console.log("stopProgressBar started. Args:", args);
  clearInterval(intervId);
  // release our intervalID from the variable
  intervId = null;
  callback.apply(null, args);
}