import { Component, ComponentRef, Input , Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CityBuildingStageComponent } from '../city-building-stage/city-building-stage.component';
import { building, foreGroundBottom1 } from '../app.buildingClasses';
var extendedLogging = false;
@Component({
  selector: 'app-city-building-container',
  templateUrl: './city-building-container.component.html',
  styleUrl: './city-building-container.component.css'
})
export class CityBuildingContainerComponent {
  buildingStages: Array<ComponentRef<CityBuildingStageComponent>> = [];
  @Input() triggerEvent: String = "";
  @Input() nextStage: number = 0;
  @Input() buldingClass: building|undefined = undefined;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  ngOnChanges(changes:any){
    log("ngOnChange started with changes:", changes);
    if(false){ // wenn triggerevent später noch ändern
      this.triggerEvent = "";

    }
    if(this.buldingClass){
      if(changes.nextStage.currentValue<=this.buldingClass?.maxPopStages!){ 
        var startVal = changes.nextStage.previousValue;
        var endVal = changes.nextStage.currentValue;
        log("endVal: ",endVal);
        log("startVal: ",startVal);
        if(endVal != undefined && startVal != undefined){
          for(var i = startVal; i <= endVal; i++){
            this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
            var sourceString:string = "../../assets/City/"+this.buldingClass?.plane+"/"+this.buldingClass?.name + "/Layer " + i+".png";
            log("trying this source for stage image", sourceString);
            this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", sourceString);
          }
        }
      }
    }
  }

  ngOnInit(){
    if(this.buldingClass){
      this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
      var sourceString:string = "../../assets/City/"+this.buldingClass?.plane+"/"+this.buldingClass?.name + "/Layer 0.png";
      log("trying this source for stage image", sourceString);
      this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", sourceString);
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