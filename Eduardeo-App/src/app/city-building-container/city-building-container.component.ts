import { Component, ComponentRef, Input , Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CityBuildingStageComponent } from '../city-building-stage/city-building-stage.component';
import { building, foreGroundBottom1 } from '../app.buildingClasses';
var extendedLogging = false;
var deployedPlatform = "gitHub";
@Component({
  selector: 'app-city-building-container',
  templateUrl: './city-building-container.component.html',
  styleUrl: './city-building-container.component.css'
})
export class CityBuildingContainerComponent {
  buildingStages: Array<ComponentRef<CityBuildingStageComponent>> = [];
  @Input() triggerEvent: String = "";
  @Input() nextStage: number = 1;
  @Input() buildingClass: building|undefined = undefined;
  @Input() events: Array<string> = [];
  @Input() directCmd: Array<string|number> = [];
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  ngOnChanges(changes:any){
    log("ngOnChange started with changes:", changes);
    if(false){ // wenn triggerevent später noch ändern
      this.triggerEvent = "";

    }
    if(changes.nextStage?.currentValue<=this.buildingClass?.maxPopStages!){ 
      var startVal = changes.nextStage.previousValue;
      var endVal = changes.nextStage.currentValue;
      log("endVal: ",endVal);
      log("startVal: ",startVal);
      if(endVal != undefined && startVal != undefined){
        for(var i = startVal; i <= endVal; i++){
          this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
          var sourceString:string = "../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + "/Layer " + i+".png";
          log("trying this source for stage image", sourceString);
          this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", transformImageURL(sourceString));
        }
      }
    }
    if(changes.directCmd?.currentValue && changes.directCmd?.currentValue.length != 0){
      log("Direct Command Received: ", changes.directCmd.currentValue);
      var startValue = changes.directCmd.currentValue[1];
      while(this.buildingClass && startValue < changes.directCmd.currentValue[2]){
        this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
        var sourceString:string = "../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + "/"+ changes.directCmd.currentValue[0] +" "+ startValue +".png";
        log("trying this source for stage image", sourceString);
        this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", transformImageURL(sourceString));
        startValue += 1;
      }
      this.directCmd = [];
    }
    /*
    if(changes.buildingClass !== undefined){
      this.buildingClass.events.forEach((event,index)=>{
        while(changes.buildingClass.currentValue && event.stageCounter < changes.buildingClass.currentValue.events[index].stageCounter){
          event.stageCounter += 1;
          this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
          var sourceString:string = "../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + "/"+ event.stageName + event.stageCounter +".png";
          log("trying this source for stage image", sourceString);
          this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", sourceString);
        }
      })
    }*/
    
  }

  ngOnInit(){
    if(this.buildingClass){
      this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
      var sourceString:string;
      if(this.buildingClass.maxPopStages != 0){
        sourceString = "../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + "/Layer 0.png";
        log("trying this source for stage image", sourceString);
        this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", transformImageURL(sourceString));
      }
    }

  }
  public precacheImages(){
      var tempImgs:Array<HTMLImageElement> = [];
      if(this.buildingClass){
        for(var i=0;i<this.buildingClass.maxPopStages;i++){
          var tempImg:HTMLImageElement = new Image();
          tempImg.src = transformImageURL("../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + "/Layer " + i + ".png");
        }
        this.buildingClass.events.forEach(event=>{
          for(var i=1;i<=event.maxCounter;i++){
            var tempImg:HTMLImageElement = new Image();
            tempImg.src = transformImageURL("../../assets/City/"+this.buildingClass?.plane+"/"+this.buildingClass?.name + event.stageName + i + ".png");
          }

        })
      }
  }

}

function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("city-building-container: " + message, input0);
    }else{
      console.log("city-building-container: " + message);
    }
  }
};

function transformImageURL(inputURL:string):string{
  switch(deployedPlatform){
    case "gitHub":
      return inputURL.replace("../../","../CaveQueen/");
    default:
      return inputURL; 
  }
}