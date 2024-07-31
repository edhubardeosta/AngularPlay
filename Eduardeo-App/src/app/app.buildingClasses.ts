
export class eventPopStageCondition {
    eventStageCounter:number;
    minPopStage:number;
    constructor(pEventStageCounter:number, pMinPopStage:number){
        this.eventStageCounter = pEventStageCounter;
        this.minPopStage = pMinPopStage;
    }
}
export class stageEvent {
    conditionName: string;
    stageName: string;
    stageCounter: number = 1;
    maxCounter:number = 1;
    completionCondition:string = "";
    instant:boolean = false;
    popStageConditions:Array<eventPopStageCondition> = []; 
    constructor(pConditionName:string,pStageName:string,pMaxCounter:number = 1, pCompletionCondition = "", pInstant:boolean = false){
        this.conditionName = pConditionName;
        this.stageName = pStageName;
        this.maxCounter = pMaxCounter;
        this.completionCondition = pCompletionCondition;
        this.instant = pInstant;
    }

}


export abstract class building {
    events: Array<stageEvent>;
    maxPopStages: number;
    name: string;
    plane: string;
    currentPopStage: number;

    constructor(){
        this.events = [];
        this.maxPopStages = 0;
        this.name = "";
        this.plane = ""
        this.currentPopStage = 1;
    }

}

export class foreGroundBottom1 extends building{
    constructor(){
        super()
        var foreGroundBottom1StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        foreGroundBottom1StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 3));
        this.events = [foreGroundBottom1StatueEvent];
        this.maxPopStages = 13;
        this.name = "Bottom 1";
        this.plane = "ForeGround"
    }
}
export class foreGroundBottom2 extends building{
    constructor(){
        super()
        var foreGroundBottom2StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        foreGroundBottom2StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 3));
        this.events = [foreGroundBottom2StatueEvent];
        this.maxPopStages = 7;
        this.name = "Bottom 2";
        this.plane = "ForeGround"
    }
}

export class foreGroundBottom3 extends building{
    constructor(){
        super()
        //increase the max statuecount
        var maxStatueCount2Event = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        maxStatueCount2Event.maxCounter = 2;
        maxStatueCount2Event.popStageConditions.push(new eventPopStageCondition(1, 2));
        maxStatueCount2Event.popStageConditions.push(new eventPopStageCondition(2, 2));
        this.events = [maxStatueCount2Event];
        this.maxPopStages = 5;
        this.name = "Bottom 3";
        this.plane = "ForeGround"
    }
}
export class foreGroundTop1 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 16;
        this.name = "Top 1";
        this.plane = "ForeGround"
    }
}
export class foreGroundTop2 extends building{
    constructor(){
        super()
        //increase the max statuecount
        var maxStatueCount2Event = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        maxStatueCount2Event.maxCounter = 2;
        maxStatueCount2Event.popStageConditions.push(new eventPopStageCondition(1, 9));
        maxStatueCount2Event.popStageConditions.push(new eventPopStageCondition(2, 9));
        this.events = [maxStatueCount2Event];
        this.maxPopStages = 9;
        this.name = "Top 2";
        this.plane = "ForeGround"
    }
}
export class foreGroundTop3 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 6;
        this.name = "Top 3";
        this.plane = "ForeGround"
    }
}

export class backGroundBottom1 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 6;
        this.name = "Bottom 1";
        this.plane = "BackGround"
    }
}
export class backGroundBottom2 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 21;
        this.name = "Bottom 2";
        this.plane = "BackGround"
    }
}
export class backGroundBottom3 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 8;
        this.name = "Bottom 3";
        this.plane = "BackGround"
    }
}

export class backGroundBottom4 extends building{
    constructor(){
        super()
        var backGroundBottom4StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        backGroundBottom4StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 4));
        this.events = [backGroundBottom4StatueEvent];
        this.maxPopStages = 4;
        this.name = "Bottom 4";
        this.plane = "BackGround"
    }
}

export class backGroundBottom5 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 6;
        this.name = "Bottom 5";
        this.plane = "BackGround"
    }
}
export class backGroundBottom6 extends building{
    constructor(){
        super()
        var backGroundBottom6StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        backGroundBottom6StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 4));
        this.events = [backGroundBottom6StatueEvent];
        this.maxPopStages = 4;
        this.name = "Bottom 6";
        this.plane = "BackGround"
    }
}

export class backGroundTop1 extends building{
    constructor(){
        super()
        var backGroundTop1StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        backGroundTop1StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 6));
        this.events = [backGroundTop1StatueEvent];
        this.maxPopStages = 24;
        this.name = "Top 1";
        this.plane = "BackGround"
    }
}

export class backGroundTop2 extends building{
    constructor(){
        super()
        var backGroundTop2StatueEvent = new stageEvent("statueInProgress","Statue", 1, "lastStatueConstructed");
        backGroundTop2StatueEvent.popStageConditions.push(new eventPopStageCondition(1, 2));
        this.events = [backGroundTop2StatueEvent];
        this.maxPopStages = 21;
        this.name = "Top 2";
        this.plane = "BackGround"
    }
}
export class backGroundTop3 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 11;
        this.name = "Top 3";
        this.plane = "BackGround"
    }
}
export class backGroundTop4 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 32;
        this.name = "Top 4";
        this.plane = "BackGround"
    }
}
export class backGroundTop5 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 13;
        this.name = "Top 5";
        this.plane = "BackGround"
    }
}
export class magicAcademy extends building{
    constructor(){
        var lvl1Event = new stageEvent("mageAcademyLevel1","Academy", 1, "", true);
        lvl1Event.stageCounter = 0;
        var lvl2Event = new stageEvent("mageAcademyLevel2","Academy", 2, "", true);
        lvl2Event.stageCounter = 1;
        var lvl3Event = new stageEvent("mageAcademyLevel3","Academy", 3, "", true);
        lvl3Event.stageCounter = 2;
        var lvl4Event = new stageEvent("mageAcademyLevel4","Academy", 4, "", true);
        lvl4Event.stageCounter = 3;
        var lvl5Event = new stageEvent("mageAcademyLevel5","Academy", 5, "", true);
        lvl5Event.stageCounter = 4;
        //increase the max statuecount
        var maxStatueCount5Event = new stageEvent("statueInProgress","Statue", 5, "lastStatueConstructed");
        maxStatueCount5Event.popStageConditions.push(new eventPopStageCondition(1, 0));
        maxStatueCount5Event.popStageConditions.push(new eventPopStageCondition(2, 0));
        maxStatueCount5Event.popStageConditions.push(new eventPopStageCondition(3, 0));
        maxStatueCount5Event.popStageConditions.push(new eventPopStageCondition(4, 0));
        maxStatueCount5Event.popStageConditions.push(new eventPopStageCondition(5, 0));
        super()
        this.events = [lvl1Event, lvl2Event, lvl3Event, lvl4Event, lvl5Event, maxStatueCount5Event];
        this.maxPopStages = 0;
        this.name = "Floating 1";
        this.plane = "ForeGround"
    }
}




