import { Component, Input } from '@angular/core';
import { UtilsService } from '../utils.service';
import { 
  building,
  foreGroundBottom1, 
  foreGroundBottom2, 
  foreGroundBottom3, 
  foreGroundTop1, 
  foreGroundTop2, 
  foreGroundTop3, 
  backGroundBottom1,
  backGroundBottom2,
  backGroundBottom3,
  backGroundBottom4,
  backGroundBottom5,
  backGroundBottom6,
  backGroundTop1,
  backGroundTop2,
  backGroundTop3,
  backGroundTop4,
  backGroundTop5
} from '../app.buildingClasses';
var utils:UtilsService = new UtilsService();
var extendedLogging = true;
var accDifference: number = 0;
@Component({
  selector: 'app-city-container',
  templateUrl: './city-container.component.html',
  styleUrl: './city-container.component.css'
})
export class CityContainerComponent {
  @Input() populace:number = 0
  @Input() activeEvents: Array<string> = []
  buildingClasses: Array<building> = 
  [
    new foreGroundBottom1(), 
    new foreGroundBottom2(), 
    new foreGroundBottom3(), 
    new foreGroundTop1(),
    new foreGroundTop2(),
    new foreGroundTop3(),
    new backGroundBottom1(),
    new backGroundBottom2(),
    new backGroundBottom3(),
    new backGroundBottom4(),
    new backGroundBottom5(),
    new backGroundBottom6(),
    new backGroundTop1(),
    new backGroundTop2(),
    new backGroundTop3(),
    new backGroundTop4(),
    new backGroundTop5(),
  ];

  ngOnChanges(changes:any){
    log("ngOnchanges: ",changes);
    if(!changes.populace.firstChange && changes.populace.currentValue){
      var difference:number = changes.populace.currentValue - changes.populace.previousValue;
      log("difference in population: ", difference);
      while(difference>0){
        if(difference>9){
          this.advanceDuePopulace();
          difference -= 10;
        }else{
          accDifference += difference;
          difference = 0;
          if(accDifference>9){
            this.advanceDuePopulace();
            accDifference -= 10;
          }
        }
      }
    }

  }
  
  advanceDuePopulace(){
    var selectedNumber = utils.getRandomInt(this.buildingClasses.length);
    var escapeCounter = 0;
    if(this.buildingClasses.find((element)=>{return element.currentPopStage<=element.maxPopStages})){
      while(this.buildingClasses[selectedNumber].currentPopStage>=this.buildingClasses[selectedNumber].maxPopStages && escapeCounter<1000)
      {
        selectedNumber = utils.getRandomInt(this.buildingClasses.length);
        escapeCounter++;
      }
      this.buildingClasses[selectedNumber].currentPopStage += 1;
      if(escapeCounter>=1000)
        log("escaped infinite while loop after this number of tries: ", escapeCounter); // this is not supposed to happen anymore, as soon as all buildings are reachable
      log("advancing building container at position: ", selectedNumber);
    }else{
      log("advancing building container not possible, no more stages left.");

    }
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