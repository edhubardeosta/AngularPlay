import { Component, Input} from '@angular/core';

var extendedLogging = false;
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
  log("difference: ",difference);
  if(difference>1000){
    //seperate function for large numbers
    countLarge(targetValue, context, [targetValue, context, callback, callbackArgs]);
  }else{
    //standard way of counting
    context.displayAmount = Math.round(context.displayAmount);
    if (!context.loadIntervId) {
      if(targetValue>context.displayAmount)
        context.loadIntervId = setInterval(()=>{context.displayAmount += 1; if(context.displayAmount>targetValue-1){stopCounting(context, callback, callbackArgs)}}, 1000/difference);
      if(targetValue<context.displayAmount)
        context.loadIntervId = setInterval(()=>{context.displayAmount -= 1; if(context.displayAmount<targetValue+1){stopCounting(context, callback, callbackArgs)}}, 1000/difference);
    }else{
      clearInterval(context.loadIntervId);
      // release our intervalID from the variable
      context.loadIntervId = undefined;
      context.displayAmount = Math.round(context.displayAmount);
      if(targetValue>context.displayAmount)
        context.loadIntervId = setInterval(()=>{context.displayAmount += 1; if(context.displayAmount>targetValue-1){stopCounting(context, callback, callbackArgs)}}, 1000/difference);
      if(targetValue<context.displayAmount)
        context.loadIntervId = setInterval(()=>{context.displayAmount -= 1; if(context.displayAmount<targetValue+1){stopCounting(context, callback, callbackArgs)}}, 1000/difference);

    }
  }
}

function countLarge(targetValue:number, context:any, callbackArgs:Array<any> = []) {
  log("countTo started with targetValue:", targetValue);
  log("and displayAmount: ", context.displayAmount)
  log("and IntervId: ",context.loadIntervId);
  var difference:number = context.displayAmount - targetValue;
  if(difference<0)
    difference = difference*-1;
  log("difference: ",difference);
  if (!context.loadIntervId) {
    if(targetValue>context.displayAmount)
      context.loadIntervId = setInterval(()=>{context.displayAmount += Math.round(difference/100); if(context.displayAmount>targetValue-difference/10){stopCounting(context, countTo, callbackArgs)}}, 1000/difference);
    if(targetValue<context.displayAmount)
      context.loadIntervId = setInterval(()=>{context.displayAmount -= Math.round(difference/100); if(context.displayAmount<targetValue+difference/10){stopCounting(context, countTo, callbackArgs)}}, 1000/difference);
  }else{
    clearInterval(context.loadIntervId);
    // release our intervalID from the variable
    context.loadIntervId = undefined;
    if(targetValue>context.displayAmount)
      context.loadIntervId = setInterval(()=>{context.displayAmount += Math.round(difference/100); if(context.displayAmount>targetValue-difference/10){stopCounting(context, countTo, callbackArgs)}}, 1000/difference);
    if(targetValue<context.displayAmount)
      context.loadIntervId = setInterval(()=>{context.displayAmount -= Math.round(difference/100); if(context.displayAmount<targetValue+difference/10){stopCounting(context, countTo, callbackArgs)}}, 1000/difference);

  }
}
function stopCounting(context:any, callback: Function, args: Array<any> = []){
  log("stopCounting started. Args:", args);
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