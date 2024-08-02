import { Component, Input } from '@angular/core';

var extendedLogging:boolean = true;
@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrl: './end-screen.component.css'
})
export class EndScreenComponent {
  @Input() endScreenEvent:string = "";
  displayText:string = "";
  textHidden:boolean = true;
  textFadeIn:boolean = false;
  defeatScreenHidden:boolean = true;
  victoryScreenHidden:boolean = true;
  ngOnChanges(changes:any){
    log("change detected: ", changes);
    if(changes.endScreenEvent?.currentValue !== "" && changes.endScreenEvent?.currentValue !== undefined){
      switch(changes.endScreenEvent.currentValue){
        case "gameOver":
          this.displayText = "Deep down, in the caves and tunnels to the core of the world, countless cities, realms and kingdoms lie. Lost and forgotten to darkness, your dying city will join the soon. The people already left. Soon, so will the light, the warmth, and then the memory."
          this.textHidden = false;
          this.textFadeIn = true;
          this.defeatScreenHidden = false;
          this.victoryScreenHidden = true;
          break;
        case "gameWon":
          this.displayText = "Many challenges now lie in your cities wake. It bears its scars proudly, for the fond memories and unyielding unity of your people will shine in spite of any darkness. There is no doubt of a bright and prosperous future ahead."
          this.textHidden = false;
          this.textFadeIn = true;
          this.defeatScreenHidden = true;
          this.victoryScreenHidden = false;
          break;
        default:
          break;

      }

    }


  }
  ngOnInit(){
    //precaching probably not necessary here, I'll do it anyways
    var tempImg:HTMLImageElement = new Image();
    tempImg.src = "../../assets/victoryScreen.png";
    var tempImg2:HTMLImageElement = new Image();
    tempImg2.src = "../../assets/defeatScreen.png";
  }

}
function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("End-Screen: " + message, input0);
    }else{
      console.log("End-Screen: " + message);
    }
  }
};
