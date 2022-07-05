class Npc {
    constructor(body,config) {
        this.init();
        this.body = body;
        this.sysConfig = config;
    }

    init() {
        this.downImgArr = [0];
        this.leftImgArr = [1];
        this.upImgArr = [2];
    }

    


}

export default Npc