import { Component, Input} from '@angular/core';

var extendedLogging = true;
@Component({
  selector: 'app-resource-counter',
  templateUrl: './resource-counter.component.html',
  styleUrl: './resource-counter.component.css'
})
export class ResourceCounterComponent {
  loadIntervId:any;
  @Input() amount:number = 0; 
  @Input() outline:boolean = true;
  @Input() icon = "";
  @Input() displayAmount:number = 0;

  ngOnChanges(changes:any){
    if(changes.amount?.currentValue != changes.amount?.previousValue){
      log("Change on amount detected!");
      countTo(this.amount, this);
    }

  }

}

function countTo(targetValue:number, context:any, callback: Function = ()=>{}, callbackArgs:Array<any> = []) {
  log("countTo started with targetValue:", targetValue);
  log("and displayAmount: ", context.displayAmount)
  log("and IntervId: ",context.loadIntervId);
  var difference:number = context.displayAmount - targetValue;
  if(difference<0)
    difference = difference*-1;
  if (!context.loadIntervId) {
    if(targetValue>context.displayAmount)
      context.loadIntervId = setInterval(()=>{log("displayAmount:", context.displayAmount); context.displayAmount += 1; if(context.displayAmount>targetValue-1){stopCounting(context, callback, callbackArgs)}}, 50/difference);
    if(targetValue<context.displayAmount)
      context.loadIntervId = setInterval(()=>{log("displayAmount:", context.displayAmount); context.displayAmount -= 1; if(context.displayAmount<targetValue+1){stopCounting(context, callback, callbackArgs)}}, 50/difference);
  }
}
function stopCounting(context:any, callback: Function, args: Array<any> = []){
  console.log("stopCounting started. Args:", args);
  clearInterval(context.loadIntervId);
  // release our intervalID from the variable
  context.loadIntervId = undefined;
  callback.apply(null, args);
}
function log(message: string | any, input0: any = undefined):void{
  if(extendedLogging){
    if(input0 != undefined){
      console.log("Resource-Counter: " + message, input0);
    }else{
      console.log("Resource-Counter: " + message);
    }
  }
};