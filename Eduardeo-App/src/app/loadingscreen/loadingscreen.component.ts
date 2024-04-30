import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'; 

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrl: './loadingscreen.component.css'
})
export class LoadingscreenComponent {
progressBarValue = 0;
  @Input() progressBarValueInternal = 0;
  @Input() loadScreenHidden = true;

  @Output() finishedLoading = new EventEmitter<number>();

  @ViewChild('loadingProgressBar', {static: false}) loadingProgressBar!: MatProgressBar;

  ngOnchanges(changes:any){
    console.log("Change on Loadingscreen detected:", changes);
  }

}
