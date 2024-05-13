import { Component, Input, ViewChild } from '@angular/core';
var extendedLogging: boolean = false;
@Component({
  selector: 'app-hoard-item',
  templateUrl: './hoard-item.component.html',
  styleUrl: './hoard-item.component.css'
})
export class HoardItemComponent {
  classList = "fallInPlace coin";
  imgSrc = "../../assets/Coppercoin.png";
  @Input() zIndex = 0;
  @Input() fallHeight = 0;
  @Input() x = 0;
  @Input() y = 0;
  @Input() itemType = "copperCoin";

  offsetPath = 'path("M'+this.x+','+this.y+' L'+this.x+','+this.fallHeight*-1+'")';
  ngOnChanges(changes:any){
    log("Hoard-Item detected change: ", changes);
    if(changes.x || changes.y)
    this.offsetPath = 'path("M'+this.x+','+this.y+' L'+this.x+','+this.fallHeight*-1+'")';
    switch (this.itemType){
      case "copperCoin": 
        this.imgSrc = "../../assets/Coppercoin.png";
        break;
      case "silverCoin": 
        this.imgSrc = "../../assets/Silvercoin.png";
        break;
      case "goldCoin": 
        this.imgSrc = "../../assets/Goldcoin.png";
        break;
      case "crystal":
        this.imgSrc = "../../assets/crystal.png"; 
        break;
      default: 
        break;
    }
  }

}
function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Hoard: " + message, input0);
    }else{
      console.log("Hoard: " + message);
    }
  }
};
