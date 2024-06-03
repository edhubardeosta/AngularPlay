import { Component, ComponentRef, Input , Output, ViewChild, ViewContainerRef} from '@angular/core';
import { selector } from 'gsap';
import { CityBuildingStageComponent } from '../city-building-stage/city-building-stage.component';
var extendedLogging = true;
@Component({
  selector: 'app-city-building-container',
  templateUrl: './city-building-container.component.html',
  styleUrl: './city-building-container.component.css'
})
export class CityBuildingContainerComponent {
  buildingStages: Array<ComponentRef<CityBuildingStageComponent>> = [];
  @Input() plane: String = "ForeGround"
  @Input() triggerEvent: String = "";
  @Input() nextStage: Boolean = false;
  @Input() type: String = "";
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  ngOnChanges(changes:any){
    log("ngOnChange started with changes:", changes);
    if(false){ // wenn triggerevent später noch ändern
      this.triggerEvent = "";

    }
    if(false){ // wenn nextstage geändert später noch ändern
      this.buildingStages.push(this.container.createComponent(CityBuildingStageComponent));
      log("trying this source for stage image", "../../assets/City"+this.plane+this.type + "Layer " + (this.buildingStages.length-1));
      this.buildingStages[this.buildingStages.length-1].setInput("imgSrc", "../../assets/City"+this.plane+this.type + "Layer " + (this.buildingStages.length-1));
      this.nextStage = false;
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