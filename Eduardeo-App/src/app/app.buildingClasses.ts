
export abstract class building {
    events: Array<string>;
    maxPopStages: number;
    name: string;
    plane: string;
    currentPopStage: number;

    constructor(){
        this.events = [];
        this.maxPopStages = 0;
        this.name = "";
        this.plane = ""
        this.currentPopStage = 0;
    }

}

export class foreGroundBottom1 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 13;
        this.name = "Bottom 1";
        this.plane = "ForeGround"
    }
}
export class foreGroundBottom2 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 7;
        this.name = "Bottom 2";
        this.plane = "ForeGround"
    }
}

export class foreGroundBottom3 extends building{
    constructor(){
        super()
        this.events = [];
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
        this.events = [];
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
        this.events = [];
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
        this.events = [];
        this.maxPopStages = 4;
        this.name = "Bottom 6";
        this.plane = "BackGround"
    }
}

export class backGroundTop1 extends building{
    constructor(){
        super()
        this.events = [];
        this.maxPopStages = 24;
        this.name = "Top 1";
        this.plane = "BackGround"
    }
}

export class backGroundTop2 extends building{
    constructor(){
        super()
        this.events = [];
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




