import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Eduardeo-App';
}
var nIntervId:any;
function docReady(fn:any) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}    
function fakeProgressBar(element:MatProgressBar) {
// check if an interval has already been set up
if (!nIntervId) {
  nIntervId = setInterval(()=>{ element.value += 1; if(element.value>99){stopProgressBar()}}, 25);
}
}
function stopProgressBar() {
clearInterval(nIntervId);
// release our intervalID from the variable
nIntervId = null;
}
docReady(main);
console.log("Script started.")
function main():void{
  console.log("Doc is ready, Main has started!")
  var progBar1:any;
  progBar1 = document.getElementById("progBar1");
  console.log("Is progBar1 instanceof MatProgressBar?", progBar1 instanceof MatProgressBar);
  console.log("progBar1:", progBar1);
  if(progBar1 instanceof MatProgressBar){
    fakeProgressBar(progBar1);
  }
}