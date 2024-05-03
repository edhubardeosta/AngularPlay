import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-hoard-item',
  templateUrl: './hoard-item.component.html',
  styleUrl: './hoard-item.component.css'
})
export class HoardItemComponent {
  @Input() fallHeight = 0;
  @Input() x = 0;
  @Input() y = 0;
  offsetPath = 'path("M'+this.x+','+this.y+' L'+this.x+','+this.fallHeight*-1+'")';
  ngOnChanges(changes:any){
    this.offsetPath = 'path("M'+this.x+','+this.y+' L'+this.x+','+this.fallHeight*-1+'")';
  }

}
