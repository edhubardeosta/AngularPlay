import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  backGroundTop5,
  magicAcademy,
  eventPopStageCondition
} from '../app.buildingClasses';
var utils:UtilsService = new UtilsService();
var extendedLogging = false;
var accDifference: number = 0;
var increaseThreshold = 5;
var temporaryEvents = ["statueInProgress"];
var permanentEvents = ["mageAcademyLevel1","mageAcademyLevel2","mageAcademyLevel3","mageAcademyLevel4","mageAcademyLevel5"];
var saturatedPermanentEvents = [];
@Component({
  selector: 'app-city-container',
  templateUrl: './city-container.component.html',
  styleUrl: './city-container.component.css'
})
export class CityContainerComponent {
  @Input() populace:number = 0
  @Input() activeEvents: Array<string> = []
  @Input() checkEvents: number = 0;
  @Output() deleteConditionEvent = new EventEmitter<string>();
  @Output() addConditionEvent = new EventEmitter<string>();
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
    new magicAcademy()
  ];
  directCmdArgs:Array<Array<string|number>> = [];
  numberOfManualUpdates:number = 0;
  constructor(){
    this.directCmdArgs.fill([],0,16);
  }

  ngOnChanges(changes:any){
    log("ngOnchanges: ",changes);
    if(changes.checkEvents?.currentValue != undefined){
      if(permanentEvents.find((element:string)=>{
        return this.activeEvents.includes(element);
      })){
        log("Starting permanentAdvancement");
        this.permInstantAdvancement();
      }

    }
    this.directCmdArgs.fill([],0,16);
    if(!changes.populace?.firstChange && changes.populace?.currentValue){
      var difference:number = changes.populace.currentValue - changes.populace.previousValue;
      log("difference in population: ", difference);
      while(difference>0 || accDifference>=increaseThreshold){
        if(difference>=increaseThreshold){
          this.advanceDuePopulace();
          difference -= increaseThreshold;
        }else{
          accDifference += difference;
          difference = 0;
          if(accDifference>=increaseThreshold){
            this.advanceDuePopulace();
            accDifference -= increaseThreshold;
          }
        }
      }
    }
  }
  
  advanceDuePopulace(){
    if(temporaryEvents.find((element:string)=>{
      return this.activeEvents.includes(element);
    })){
      this.temporaryEventAdvancement();
    }else{
      if(permanentEvents.find((element:string)=>{
        return this.activeEvents.includes(element);
      })){
        this.permanentEventAdvancement();
      }else{
        this.standardAdvancement();
      }
    }
  }

  temporaryEventAdvancement(){
    var advancedSuccessfully = false;
    temporaryEvents.forEach(tempEvent => {
      log("Temporary Event found: ", tempEvent);
      if(this.activeEvents.includes(tempEvent) && !advancedSuccessfully){
        var tempEventCompleted = true;
        var completionCondition = "";
        this.buildingClasses.forEach((building, buildingIndex) => {
          if(building.events.find(hasEvent => {return(hasEvent.conditionName == tempEvent)}) && !advancedSuccessfully){
            building.events.forEach( (buildingEvent, eventIndex) => {
              if(buildingEvent.conditionName == tempEvent){
                var evaluateEventStageCondition = buildingEvent.popStageConditions.find(eventStageCondition => {return(eventStageCondition.eventStageCounter >= buildingEvent.stageCounter)});
                if(evaluateEventStageCondition){
                  if(evaluateEventStageCondition.minPopStage <= building.currentPopStage){
                    //build it
                    advancedSuccessfully = true;
                    log("Advancing an event stage for: ", this.buildingClasses[buildingIndex].name);
                    var startCounter = this.buildingClasses[buildingIndex].events[eventIndex].stageCounter;
                    var endCounter = startCounter+1;
                    var stageName = this.buildingClasses[buildingIndex].events[eventIndex].stageName;
                    this.directCmdArgs[buildingIndex] = [stageName, startCounter, endCounter]
                    this.buildingClasses[buildingIndex].events[eventIndex].stageCounter+=1;
                    this.deleteConditionEvent.emit(tempEvent);
                    tempEventCompleted = false;
                  }else{
                    //can't build it yet
                    tempEventCompleted = false;
                  }

                }else{
                  //The building has all the event items built
                  completionCondition = buildingEvent.completionCondition;
                }
              }

            })
          }else{
            //no building has this event
          }
        })
        if(completionCondition !== "" && tempEventCompleted == true){
          this.addConditionEvent.emit(completionCondition);
        }

      }
    })
    if(!advancedSuccessfully){
      this.permanentEventAdvancement();
    }

  }

  permInstantAdvancement(){
    var advancedSuccessfully = false;
    permanentEvents.forEach(permEvent => {
      log("Permanent Event found : ", permEvent);
      if(this.activeEvents.includes(permEvent) && !advancedSuccessfully){
        var completionCondition = "";
        this.buildingClasses.forEach((building, buildingIndex) => {
          if(building.events.find(hasEvent => {return(hasEvent.conditionName == permEvent)}) && !advancedSuccessfully){
            building.events.forEach( (buildingEvent, eventIndex) => {
              if(buildingEvent.conditionName == permEvent && buildingEvent.instant == true){
                var evaluateEventStageCondition = buildingEvent.popStageConditions.find(eventStageCondition => {return(eventStageCondition.eventStageCounter >= buildingEvent.stageCounter)});
                if(evaluateEventStageCondition){
                  if(evaluateEventStageCondition.minPopStage <= building.currentPopStage){
                    //build it
                    log("Advancing an event stage for: ", this.buildingClasses[buildingIndex].name);
                    var startCounter = this.buildingClasses[buildingIndex].events[eventIndex].stageCounter;
                    var endCounter = this.buildingClasses[buildingIndex].events[eventIndex].maxCounter;
                    if(startCounter<endCounter){
                      advancedSuccessfully = true;
                      var stageName = this.buildingClasses[buildingIndex].events[eventIndex].stageName;
                      this.directCmdArgs[buildingIndex] = [stageName, startCounter, endCounter]
                      this.buildingClasses[buildingIndex].events[eventIndex].stageCounter = endCounter;
                    }
                  }

                }else{
                  //The building has all the event items built or has no popStageConditions.
                  if(buildingEvent.popStageConditions.length == 0){
                    //build it
                    log("Advancing an event stage for:", this.buildingClasses[buildingIndex].name);
                    var startCounter = this.buildingClasses[buildingIndex].events[eventIndex].stageCounter;
                    var endCounter = this.buildingClasses[buildingIndex].events[eventIndex].maxCounter;
                    if(startCounter<endCounter){
                      advancedSuccessfully = true;
                      var stageName = this.buildingClasses[buildingIndex].events[eventIndex].stageName;
                      this.directCmdArgs[buildingIndex] = [stageName, startCounter, endCounter]
                      this.buildingClasses[buildingIndex].events[eventIndex].stageCounter = endCounter;
                    }
                  }else{
                    completionCondition = buildingEvent.completionCondition;
                  }
                }
              }

            })
          }else{
            //no building has this event
          }
        })
        if(completionCondition !== "" /*&& tempEventCompleted == true*/){
          //this.addConditionEvent.emit(completionCondition);
        }

      }
    })

  }
  permanentEventAdvancement(){
    var advancedSuccessfully = false;
    permanentEvents.forEach(permEvent => {
      log("Permanent Event found: ", permEvent);
      if(this.activeEvents.includes(permEvent) && !advancedSuccessfully){
        this.buildingClasses.forEach((building, buildingIndex) => {
          if(building.events.find(hasEvent => {return(hasEvent.conditionName == permEvent)}) && !advancedSuccessfully){
            building.events.forEach( (buildingEvent, eventIndex) => {
              if(buildingEvent.conditionName == permEvent){
                var evaluateEventStageCondition = buildingEvent.popStageConditions.find(eventStageCondition => {return(eventStageCondition.eventStageCounter >= buildingEvent.stageCounter)});
                if(evaluateEventStageCondition){
                  if(evaluateEventStageCondition.minPopStage <= building.currentPopStage){
                    //build it
                    advancedSuccessfully = true;
                    log("Advancing an event stage for: ", this.buildingClasses[buildingIndex].name);
                    var startCounter = this.buildingClasses[buildingIndex].events[eventIndex].stageCounter;
                    var endCounter = startCounter+1;
                    var stageName = this.buildingClasses[buildingIndex].events[eventIndex].stageName;
                    this.directCmdArgs[buildingIndex] = [stageName, startCounter, endCounter]
                    this.buildingClasses[buildingIndex].events[eventIndex].stageCounter+=1;
                    if(buildingEvent.completionCondition !== ""){
                      this.activeEvents.push(buildingEvent.completionCondition);
                    }
                  }

                }else{
                  //The building has all the event items built
                }
              }

            })
          }else{
            //no building has this event
          }
        })

      }
    })
    if(!advancedSuccessfully){
      this.standardAdvancement();
    }
  }

  standardAdvancement(){
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
        log("escaped infinite while loop after this number of tries: ", escapeCounter); // this is not supposed to happen if all buildings are reachable
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