import { Component, Input } from '@angular/core';
import { UtilsService } from '../utils.service';
var utils:UtilsService = new UtilsService();
var extendedLogging = true;
@Component({
  selector: 'app-city-container',
  templateUrl: './city-container.component.html',
  styleUrl: './city-container.component.css'
})
export class CityContainerComponent {
  @Input() populace:number = 0
  @Input() activeEvents: Array<string> = []
  stageAdvancementBools: Array<boolean> = [false];

  ngOnChanges(changes:any){
    log("ngOnchanges: ",changes);
    if(!changes.populace.firstChange && changes.populace.currentValue){
      var difference:number = changes.populace.currentValue - changes.populace.previousValue;
      log("difference in population: ", difference);
      while(difference>0){
        this.advanceDuePopulace;
        difference -= 50;
      }
    }

  }
  
  advanceDuePopulace(){
    var selectedNumber = utils.getRandomInt(this.stageAdvancementBools.length);
    this.stageAdvancementBools[selectedNumber] = true;
    log("advancing city container at position: ", selectedNumber);
  }
}

function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("city-container: " + message, input0);
    }else{
      console.log("city-container: " + message);
    }
  }
};