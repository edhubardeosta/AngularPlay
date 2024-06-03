import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-building-stage',
  templateUrl: './city-building-stage.component.html',
  styleUrl: './city-building-stage.component.css'
})
export class CityBuildingStageComponent {
  @Input() imgSrc: String = "";

}
