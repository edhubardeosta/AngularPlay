import { Component, Input } from '@angular/core';
var deployedPlatform = "gitHub";

@Component({
  selector: 'app-city-building-stage',
  templateUrl: './city-building-stage.component.html',
  styleUrl: './city-building-stage.component.css'
})
export class CityBuildingStageComponent {
  @Input() imgSrc: String = transformImageURL("../../assets/City/placeHolder.png");

}

function transformImageURL(inputURL:string):string{
  switch(deployedPlatform){
    case "gitHub":
      return inputURL.replace("../../","../CaveQueen/");
    default:
      return inputURL; 
  }
}